#!/usr/bin/env node

/**
 * 检查 blog_posts 表中的 cover_image 字段
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ygnbikloljpjzkxxcoar.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkCoverImages() {
  console.log('🔍 Checking cover_image field in blog_posts...\n')

  // 查询 guides 分类的文章
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, cover_image')
    .eq('category', 'guides')
    .order('published_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }

  if (!data || data.length === 0) {
    console.log('⚠️  No guides found')
    return
  }

  console.log(`Found ${data.length} guides:\n`)
  data.forEach((guide, index) => {
    console.log(`${index + 1}. ${guide.title}`)
    console.log(`   Slug: ${guide.slug}`)
    console.log(`   Cover Image: ${guide.cover_image || '❌ NULL'}`)
    console.log('')
  })

  // 检查是否有 cover_image 字段
  const hasImages = data.some(g => g.cover_image)
  if (!hasImages) {
    console.log('⚠️  No guides have cover_image set')
    console.log('\n💡 To add cover images, run:')
    console.log('   UPDATE blog_posts SET cover_image = \'https://example.com/image.jpg\' WHERE slug = \'your-slug\';')
  }
}

checkCoverImages()
