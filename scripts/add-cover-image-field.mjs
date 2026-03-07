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
  console.log('🔧 Adding cover_image field to blog_posts table...')

  // 使用 Supabase SQL 执行
  const { data, error } = await supabase.rpc('exec_sql', {
    sql: 'ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT;'
  })

  if (error) {
    console.error('❌ Error:', error.message)
    console.log('ℹ️  Please run this SQL manually in Supabase dashboard:')
    console.log('   ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT;')
    process.exit(1)
  }

  console.log('✅ cover_image field added successfully')
}

addCoverImageField()
