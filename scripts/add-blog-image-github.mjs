#!/usr/bin/env node
/**
 * 临时方案：使用 GitHub Raw URLs 作为图床
 * 优点：无需额外配置，立即可用
 * 缺点：需要 commit + push
 */

import { createClient } from '@supabase/supabase-js'
import { execSync } from 'child_process'
import path from 'path'

const supabaseUrl = 'https://ygnbikloljpjzkxxcoar.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)
const blogSlug = process.argv[2]

if (!blogSlug) {
  console.error('❌ Usage: node scripts/add-blog-image-github.mjs <blog-slug>')
  process.exit(1)
}

async function main() {
  console.log(`🔍 Fetching blog post: ${blogSlug}`)

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', blogSlug)
    .single()

  if (error || !post) {
    console.error('❌ Blog post not found')
    process.exit(1)
  }

  console.log(`📝 Title: ${post.title}`)

  // Generate image
  const imageFilename = `${blogSlug}.png`
  const imagePath = path.join(process.cwd(), 'public', 'blog-images', imageFilename)

  const imagePrompt = `Create a professional technical illustration for "${post.title}". Modern, clean design with tech-focused colors. 16:9 aspect ratio. No text.`

  console.log(`\n🎨 Generating image...`)

  try {
    execSync(
      `node ~/clawd/skills/nbnb-image-gen/generate.js ` +
      `--prompt "${imagePrompt}" ` +
      `--out "${imagePath}" ` +
      `--resolution 2048x2048 ` +
      `--aspect-ratio 16:9`,
      { stdio: 'inherit' }
    )
  } catch {
    console.error('❌ Failed to generate image')
    process.exit(1)
  }

  // GitHub Raw URL
  const githubUrl = `https://raw.githubusercontent.com/Tony11081/clawlist-io/main/public/blog-images/${imageFilename}`

  // Update blog post
  if (!post.content.includes('![')) {
    const coverImage = `![${post.title}](${githubUrl})\n\n`
    const updatedContent = coverImage + post.content

    await supabase
      .from('blog_posts')
      .update({ content: updatedContent })
      .eq('id', post.id)
  }

  console.log('\n✅ Image generated!')
  console.log(`📁 Local: ${imagePath}`)
  console.log(`🌐 GitHub URL: ${githubUrl}`)
  console.log('\n💡 Next steps:')
  console.log('   1. git add public/blog-images/')
  console.log('   2. git commit -m "Add blog image"')
  console.log('   3. git push origin main')
  console.log('   4. Wait ~1 min for GitHub CDN to update')
}

main().catch(console.error)
