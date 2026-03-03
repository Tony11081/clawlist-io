import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ygnbikloljpjzkxxcoar.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmJpa2xvbGpwanpreHhjb2FyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ5OTA5NSwiZXhwIjoyMDg4MDc1MDk1fQ.h6X6UBVjEQjzs0kmJea-xwfOWvCxsbtUkihlAbb2r60'
)

async function init() {
  const skills = [
    {
      name: 'GitHub Issues',
      slug: 'github-issues',
      summary: '自动处理 GitHub Issues 并提交 PR',
      description: '监控 GitHub Issues，使用 AI 分析问题，生成修复代码，自动提交 Pull Request',
      category: '代码',
      risk_level: 'low',
      github_url: 'https://github.com/openclaw/skills/gh-issues',
      stars: 234,
      install_cmd: 'npx skills add gh-issues',
      openclaw_version_range: '>=0.9.0',
      permissions: ['文件读写', '网络请求', 'Git 操作'],
      tags: ['github', 'automation', 'pr'],
      upvotes: 156
    },
    {
      name: 'Browser Agent',
      slug: 'browser-agent',
      summary: '浏览器自动化测试和数据抓取',
      description: '使用 Playwright 进行浏览器自动化，支持测试、截图、数据抓取等功能',
      category: '自动化',
      risk_level: 'medium',
      github_url: 'https://github.com/openclaw/skills/browser-agent',
      stars: 189,
      install_cmd: 'npx skills add browser-agent',
      openclaw_version_range: '>=0.9.0',
      permissions: ['浏览器控制', '网络请求'],
      tags: ['browser', 'testing', 'scraping'],
      upvotes: 89
    },
    {
      name: 'Email Marketing',
      slug: 'email-marketing',
      summary: '自动化邮件营销和客户管理',
      description: '批量发送邮件、管理订阅者、跟踪打开率和点击率',
      category: '营销',
      risk_level: 'low',
      github_url: 'https://github.com/openclaw/skills/email-marketing',
      stars: 145,
      install_cmd: 'npx skills add email-marketing',
      openclaw_version_range: '>=0.9.0',
      permissions: ['网络请求', '文件读取'],
      tags: ['email', 'marketing', 'crm'],
      upvotes: 67
    },
    {
      name: 'Apple Notes',
      slug: 'apple-notes',
      summary: '管理 Apple Notes via CLI',
      description: '通过命令行创建、读取、搜索和管理 Apple Notes',
      category: '笔记',
      risk_level: 'low',
      github_url: 'https://github.com/openclaw/skills/apple-notes',
      stars: 98,
      install_cmd: 'npx skills add apple-notes',
      openclaw_version_range: '>=0.9.0',
      permissions: ['文件读写'],
      tags: ['notes', 'macos', 'productivity'],
      upvotes: 45
    },
    {
      name: 'WeChat Publisher',
      slug: 'wechat-publisher',
      summary: '自动发布内容到微信公众号',
      description: '通过 API 或浏览器自动化发布文章到微信公众号',
      category: '社媒',
      risk_level: 'medium',
      github_url: 'https://github.com/openclaw/skills/wechat-publisher',
      stars: 267,
      install_cmd: 'npx skills add wechat-publisher',
      openclaw_version_range: '>=0.9.0',
      permissions: ['浏览器控制', '网络请求'],
      tags: ['wechat', 'publishing', 'social'],
      upvotes: 123
    },
    {
      name: 'Image Generator',
      slug: 'image-gen',
      summary: 'AI 图片生成与编辑',
      description: '使用 DALL-E、Midjourney 等 AI 模型生成和编辑图片',
      category: '创作',
      risk_level: 'low',
      github_url: 'https://github.com/openclaw/skills/image-gen',
      stars: 456,
      install_cmd: 'npx skills add image-gen',
      openclaw_version_range: '>=0.9.0',
      permissions: ['网络请求'],
      tags: ['ai', 'image', 'generation'],
      upvotes: 234
    },
    {
      name: 'Data Scraper',
      slug: 'data-scraper',
      summary: '通用数据抓取工具',
      description: '从网站抓取结构化数据，支持 CSS 选择器和 XPath',
      category: '数据',
      risk_level: 'medium',
      github_url: 'https://github.com/openclaw/skills/data-scraper',
      stars: 312,
      install_cmd: 'npx skills add data-scraper',
      openclaw_version_range: '>=0.9.0',
      permissions: ['网络请求', '浏览器控制'],
      tags: ['scraping', 'data', 'automation'],
      upvotes: 178
    },
    {
      name: 'Slack Bot',
      slug: 'slack-bot',
      summary: 'Slack 机器人集成',
      description: '在 Slack 中接收消息、发送通知、执行命令',
      category: '通讯',
      risk_level: 'low',
      github_url: 'https://github.com/openclaw/skills/slack-bot',
      stars: 201,
      install_cmd: 'npx skills add slack-bot',
      openclaw_version_range: '>=0.9.0',
      permissions: ['网络请求'],
      tags: ['slack', 'bot', 'communication'],
      upvotes: 92
    },
    {
      name: 'PDF Generator',
      slug: 'pdf-gen',
      summary: '生成和编辑 PDF 文档',
      description: '从 HTML、Markdown 或模板生成 PDF，支持水印、加密等',
      category: '文档',
      risk_level: 'low',
      github_url: 'https://github.com/openclaw/skills/pdf-gen',
      stars: 167,
      install_cmd: 'npx skills add pdf-gen',
      openclaw_version_range: '>=0.9.0',
      permissions: ['文件读写'],
      tags: ['pdf', 'document', 'generation'],
      upvotes: 81
    },
    {
      name: 'Calendar Sync',
      slug: 'calendar-sync',
      summary: '日历同步和管理',
      description: '同步 Google Calendar、Outlook 等日历，自动创建事件',
      category: '日程',
      risk_level: 'low',
      github_url: 'https://github.com/openclaw/skills/calendar-sync',
      stars: 134,
      install_cmd: 'npx skills add calendar-sync',
      openclaw_version_range: '>=0.9.0',
      permissions: ['网络请求'],
      tags: ['calendar', 'sync', 'productivity'],
      upvotes: 56
    }
  ]
  
  console.log(`🔄 插入 ${skills.length} 条示例数据...`)
  const { data, error } = await supabase.from('skills').insert(skills).select()
  
  if (error) {
    console.error('❌ 错误:', error.message)
  } else {
    console.log(`✅ 成功插入 ${data.length} 条数据！`)
    console.log('\n📋 前 3 条:')
    data.slice(0, 3).forEach(s => console.log(`  - ${s.name} (${s.category})`))
  }
}

init()
