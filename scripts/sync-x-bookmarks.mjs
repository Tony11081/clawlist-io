#!/usr/bin/env node

/**
 * braindump.md → ClawList 同步
 *
 * 从 ~/clawd/memory/braindump.md 读取已同步的 X 书签和随口想法，
 * 用 AI（Kuai Claude Haiku）筛选后录入 ClawList 的 skills 或 blog_posts 表。
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'
import Anthropic from '@anthropic-ai/sdk'

const BRAINDUMP_PATH = join(process.env.HOME, 'clawd/memory/braindump.md')
const STATE_FILE = join(process.env.HOME, 'clawd/memory/.clawlist-sync-state.json')

// Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ygnbikloljpjzkxxcoar.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmJpa2xvbGpwanpreHhjb2FyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ5OTA5NSwiZXhwIjoyMDg4MDc1MDk1fQ.h6X6UBVjEQjzs0kmJea-xwfOWvCxsbtUkihlAbb2r60'
const supabase = createClient(supabaseUrl, supabaseKey)

// Kuai API（Claude Haiku 4.5 - 筛选，Claude Sonnet 4.6 - 博客）
// 如果配额用完，请在 .env.local 设置 KUAI_API_KEY
const kuaiApiKey = process.env.KUAI_API_KEY || 'sk-ZaIcZLX7px5gq4nq8Y2FT7Gx4xokndLdhgjpln0sXFvwjSPh'
const anthropic = new Anthropic({
  apiKey: kuaiApiKey,
  baseURL: 'https://api.kuai.host'
})

/**
 * 解析 braindump.md，提取每个条目（## 开头的段落）
 */
function parseBraindump() {
  if (!existsSync(BRAINDUMP_PATH)) {
    console.error('❌ braindump.md not found:', BRAINDUMP_PATH)
    return []
  }

  const content = readFileSync(BRAINDUMP_PATH, 'utf8')
  const sections = content.split(/^## /m).filter(s => s.trim())

  return sections.map(section => {
    const lines = section.trim().split('\n')
    const header = lines[0] // e.g. "2026-03-02 14:28 #自动化 #Electron"
    const body = lines.slice(1).join('\n').trim()

    // 提取时间戳
    const dateMatch = header.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2})/)
    const timestamp = dateMatch ? dateMatch[1] : null

    // 提取标签
    const tags = (header.match(/#[\w\u4e00-\u9fa5-]+/g) || []).map(t => t.slice(1))

    // 提取来源 URL
    const urlMatch = body.match(/参考：(https:\/\/x\.com\/\S+)/)
    const sourceUrl = urlMatch ? urlMatch[1] : null

    // 提取推文 ID（用于去重）
    const idMatch = sourceUrl?.match(/\/status\/(\d+)/)
    const tweetId = idMatch ? idMatch[1] : `braindump-${timestamp}-${Math.random().toString(36).slice(2, 8)}`

    return { id: tweetId, timestamp, tags, body, sourceUrl, header }
  }).filter(e => e.body.length > 20) // 过滤太短的条目
}

/**
 * 加载已处理的 ID 状态
 */
function loadState() {
  if (existsSync(STATE_FILE)) {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'))
  }
  return { processedIds: [] }
}

/**
 * 保存状态
 */
function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
}

/**
 * AI 分析条目，判断是否适合作为 skill 或博客
 */
async function analyzeEntry(entry) {
  const prompt = `Analyze the following technical content from X/Twitter bookmarks to determine if it's suitable for ClawList (an AI agent skills directory website).

Content:
Tags: ${entry.tags.join(', ')}
Body: ${entry.body.substring(0, 800)}
Source URL: ${entry.sourceUrl || 'N/A'}

Return JSON format:
{
  "is_relevant": true/false,
  "type": "skill" | "blog" | "none",
  "category": "Development" | "DevOps" | "Marketing" | "Automation" | "AI" | "Other",
  "title": "Concise English title (max 60 chars)",
  "summary": "One-sentence English summary (max 150 chars)",
  "tags": ["tag1", "tag2", "tag3"],
  "github_url": "https://github.com/user/repo or null",
  "install_cmd": "npm install package-name or npx command or null",
  "reason": "Why relevant/not relevant"
}

**CRITICAL REQUIREMENTS:**
1. **ALL content MUST be in English** (title, summary, tags)
2. **For skills**: MUST have a valid GitHub repository URL
3. **For skills**: MUST have correct install command (npm/npx/pip/etc)
4. **GitHub URL validation**: Only include if explicitly mentioned in the content
5. **Install command**: Extract from content or infer from GitHub repo name

Classification criteria:
- **skill**: Specific tools, automation scripts, API integrations, dev utilities that can be installed
  - MUST have GitHub URL
  - MUST have install command
  - Examples: CLI tools, libraries, frameworks, automation scripts
- **blog**: Technical tutorials, best practices, architecture insights, experience sharing
  - Can be without GitHub URL
  - Focus on knowledge/insights rather than installable tools
- **none**: Pure opinions, news, non-technical content, too vague, or missing required info

Return ONLY JSON, no other text.`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }]
    })

    const text = response.content[0].text
    const match = text.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
  } catch (err) {
    console.error('❌ AI 分析失败:', err.message)
  }
  return { is_relevant: false, type: 'none' }
}

/**
 * 插入 skill 到 Supabase
 */
async function insertSkill(entry, analysis) {
  // 验证必需字段
  if (!analysis.github_url || !analysis.install_cmd) {
    console.error('  ❌ Skill 缺少 GitHub URL 或安装命令，跳过')
    return
  }

  // 验证 GitHub URL 格式
  if (!analysis.github_url.startsWith('https://github.com/')) {
    console.error('  ❌ 无效的 GitHub URL，跳过')
    return
  }

  const slug = analysis.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  // 提取 GitHub 仓库信息
  const repoMatch = analysis.github_url.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/)
  const githubUser = repoMatch ? repoMatch[1] : null
  const githubRepo = repoMatch ? repoMatch[2] : null

  const { error } = await supabase.from('skills').insert([{
    name: analysis.title,
    slug,
    summary: analysis.summary,
    description: entry.body.substring(0, 1000),
    category: analysis.category,
    risk_level: 'low',
    install_cmd: analysis.install_cmd,
    permissions: [],
    tags: analysis.tags,
    github_url: analysis.github_url,
    created_at: new Date().toISOString()
  }])

  if (error) {
    console.error('  ❌ 插入 skill 失败:', error.message)
  } else {
    console.log(`  ✅ Skill 已录入: ${analysis.title}`)
    console.log(`     GitHub: ${analysis.github_url}`)
    console.log(`     Install: ${analysis.install_cmd}`)
  }
}

/**
 * 用 Claude Sonnet 4.6 生成完整的英文博客文章
 */
async function generateBlogContent(entry, analysis) {
  const prompt = `You are a professional tech blogger writing for ClawList.io, a developer resource hub for AI automation and OpenClaw skills.

Based on the following content from an X/Twitter bookmark, write a comprehensive, SEO-optimized English blog post:

**Original Content:**
${entry.body.substring(0, 1500)}

**Topic:** ${analysis.title}
**Category:** ${analysis.category}
**Summary:** ${analysis.summary}

**Requirements:**
1. Write in clear, professional English
2. Target audience: developers, AI engineers, automation enthusiasts
3. Length: 800-1200 words
4. Structure: Introduction → Main Content (2-3 sections) → Conclusion
5. Include practical examples or use cases
6. SEO-friendly: use keywords naturally
7. Engaging and informative tone
8. Add relevant technical details

**Format as Markdown:**
- Use ## for section headings
- Use code blocks with \`\`\` for code examples
- Use bullet points for lists
- Use **bold** for emphasis

Write the complete blog post now:`

  try {
    console.log('    📝 生成博客内容（Claude Sonnet 4.6）...')
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6', // 使用 Sonnet 4.6 生成高质量博客
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    })

    const content = response.content[0].text

    // 计算阅读时间（按 200 字/分钟）
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    return { content, readingTime }
  } catch (err) {
    console.error('    ❌ 生成博客失败:', err.message)
    return { content: entry.body, readingTime: 5 }
  }
}

/**
 * 插入博客到 Supabase
 */
async function insertBlogPost(entry, analysis) {
  const slug = analysis.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  // 生成完整博客内容
  const { content, readingTime } = await generateBlogContent(entry, analysis)

  const { error } = await supabase.from('blog_posts').insert([{
    title: analysis.title,
    slug,
    summary: analysis.summary,
    content,
    category: analysis.category,
    tags: analysis.tags,
    reading_time: readingTime,
    published_at: entry.timestamp ? new Date(entry.timestamp).toISOString() : new Date().toISOString(),
    created_at: new Date().toISOString()
  }])
  if (error) console.error('  ❌ 插入博客失败:', error.message)
  else console.log(`  ✅ 博客已录入: ${analysis.title} (${readingTime} min read)`)
}

/**
 * 主函数
 */
async function main() {
  const limit = parseInt(process.env.SYNC_LIMIT || '20')
  console.log(`🚀 开始从 braindump.md 同步到 ClawList（每次处理 ${limit} 条）\n`)

  // 1. 解析 braindump.md
  const entries = parseBraindump()
  console.log(`📚 braindump.md 共 ${entries.length} 条条目`)

  // 2. 过滤已处理
  const state = loadState()
  const processedSet = new Set(state.processedIds)
  const newEntries = entries.filter(e => !processedSet.has(e.id)).slice(0, limit)
  console.log(`🆕 待处理: ${newEntries.length} 条（跳过已处理 ${processedSet.size} 条）\n`)

  if (newEntries.length === 0) {
    console.log('✅ 没有新内容需要处理')
    return
  }

  let skillCount = 0, blogCount = 0, skipCount = 0

  // 3. 逐条 AI 分析
  for (const entry of newEntries) {
    const preview = entry.body.substring(0, 60).replace(/\n/g, ' ')
    console.log(`📝 分析: ${preview}...`)

    const analysis = await analyzeEntry(entry)

    if (!analysis.is_relevant) {
      console.log(`  ⏭️  跳过 (${analysis.reason || 'not relevant'})`)
      skipCount++
    } else if (analysis.type === 'skill') {
      await insertSkill(entry, analysis)
      skillCount++
    } else if (analysis.type === 'blog') {
      await insertBlogPost(entry, analysis)
      blogCount++
    }

    // 标记已处理
    state.processedIds.push(entry.id)

    // 避免 API 限流
    await new Promise(r => setTimeout(r, 800))
  }

  // 4. 保存状态
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))

  console.log('\n' + '='.repeat(50))
  console.log(`📊 本次同步结果:`)
  console.log(`   Skills 录入: ${skillCount}`)
  console.log(`   博客录入:    ${blogCount}`)
  console.log(`   跳过:        ${skipCount}`)
  console.log('='.repeat(50))
}

main().catch(console.error)
