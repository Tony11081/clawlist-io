#!/usr/bin/env node

/**
 * 添加 cover_image 字段到 blog_posts 表
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ygnbikloljpjzkxxcoar.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function addCoverImageField() {
  console.log('🔧 Adding cover_image field to blog_posts table...\n')

  // 直接使用 SQL 查询
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id')
    .limit(1)

  if (error) {
    console.error('❌ Error connecting to database:', error.message)
    process.exit(1)
  }

  console.log('✅ Connected to database')
  console.log('\n📝 Please run this SQL in Supabase Dashboard:')
  console.log('   https://supabase.com/dashboard/project/ygnbikloljpjzkxxcoar/editor\n')
  console.log('SQL Command:')
  console.log('─'.repeat(60))
  console.log('ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT;')
  console.log('─'.repeat(60))
  console.log('\nAfter running the SQL, you can add cover images with:')
  console.log('UPDATE blog_posts SET cover_image = \'URL\' WHERE slug = \'your-slug\';')
}

addCoverImageField()
