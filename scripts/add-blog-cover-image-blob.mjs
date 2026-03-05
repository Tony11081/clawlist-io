#!/usr/bin/env node
/**
 * Add cover image to blog post using Vercel Blob storage
 * Usage: node scripts/add-blog-cover-image-blob.mjs <blog-slug>
 */

import { createClient } from '@supabase/supabase-js'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import FormData from 'form-data'
import fetch from 'node-fetch'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ygnbikloljpjzkxxcoar.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmJpa2xvbGpwanpreHhjb2FyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ5OTA5NSwiZXhwIjoyMDg4MDc1MDk1fQ.h6X6UBVjEQjzs0kmJea-xwfOWvCxsbtUkihlAbb2r60'

const supabase = createClient(supabaseUrl, supabaseKey)

const blogSlug = process.argv[2]

if (!blogSlug) {
  console.error('❌ Usage: node scripts/add-blog-cover-image-blob.mjs <blog-slug>')
  process.exit(1)
}

async function uploadToVercelBlob(imagePath) {
  const formData = new FormData()
  formData.append('file', fs.createReadStream(imagePath))

  const response = await fetch('https://clawlist.io/api/upload-image', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`)
  }

  const data = await response.json()
  return data.url
}

async function main() {
  console.log(`🔍 Fetching blog post: ${blogSlug}`)

  // Get blog post
  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', blogSlug)
    .single()

  if (fetchError || !post) {
    console.error('❌ Blog post not found:', fetchError?.message)
    process.exit(1)
  }

  console.log(`📝 Title: ${post.title}`)
  console.log(`🏷️  Tags: ${post.tags?.join(', ')}`)

  // Generate image prompt based on title and tags
  const imagePrompt = generateImagePrompt(post.title, post.tags, post.summary)
  console.log(`\n🎨 Generating image with prompt:\n${imagePrompt}\n`)

  // Generate image filename
  const imageFilename = `${blogSlug}.png`
  const tempImagePath = path.join('/tmp', imageFilename)

  // Generate image using nbnb-image-gen
  try {
    execSync(
      `node ~/clawd/skills/nbnb-image-gen/generate.js ` +
      `--prompt "${imagePrompt}" ` +
      `--out "${tempImagePath}" ` +
      `--resolution 2048x2048 ` +
      `--aspect-ratio 16:9`,
      { stdio: 'inherit' }
    )
  } catch (error) {
    console.error('❌ Failed to generate image:', error.message)
    process.exit(1)
  }

  // Upload to Vercel Blob
  console.log('\n📤 Uploading to Vercel Blob...')
  let imageUrl
  try {
    imageUrl = await uploadToVercelBlob(tempImagePath)
    console.log(`✅ Uploaded to: ${imageUrl}`)
  } catch (error) {
    console.error('❌ Failed to upload:', error.message)
    process.exit(1)
  }

  // Clean up temp file
  fs.unlinkSync(tempImagePath)

  // Check if image already exists in content
  if (post.content.includes('![')) {
    console.log('⚠️  Blog post already has an image, skipping update')
    console.log('✅ Image URL:', imageUrl)
    return
  }

  // Add cover image to blog post
  const coverImage = `![${post.title}](${imageUrl})\n\n`
  const updatedContent = coverImage + post.content

  const { error: updateError } = await supabase
    .from('blog_posts')
    .update({ content: updatedContent })
    .eq('id', post.id)

  if (updateError) {
    console.error('❌ Failed to update blog post:', updateError.message)
    process.exit(1)
  }

  console.log('\n✅ Cover image added successfully!')
  console.log(`📁 Image URL: ${imageUrl}`)
  console.log(`🌐 View at: https://clawlist.io/blog/${blogSlug}`)
  console.log('\n💡 No deployment needed - image is live immediately!')
}

function generateImagePrompt(title, tags, summary) {
  const tagContext = tags?.join(', ') || ''

  // Determine style based on tags
  let style = 'professional technical diagram'
  if (tags?.includes('ai-agents') || tags?.includes('ai')) {
    style = 'modern AI-themed illustration with neural network patterns'
  } else if (tags?.includes('automation')) {
    style = 'clean automation workflow diagram'
  } else if (tags?.includes('architecture')) {
    style = 'technical architecture diagram with layers and components'
  } else if (tags?.includes('social-media') || tags?.includes('twitter')) {
    style = 'social media themed illustration'
  }

  return `Create a ${style} for a blog post titled "${title}". ` +
    `Context: ${summary || tagContext}. ` +
    `Style: Modern, clean, professional. Tech-focused color scheme with blues, grays, and accent colors. ` +
    `Minimalist design suitable for a technical blog. High quality, 16:9 aspect ratio. ` +
    `No text or labels in the image.`
}

main().catch(console.error)
