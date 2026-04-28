#!/usr/bin/env node

/**
 * 初始化数据库字段
 * 为 skills 和 blog_posts 表添加 source_url 和 source_type 字段
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ygnbikloljpjzkxxcoar.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function initDatabase() {
  console.log('🔧 检查数据库字段...\n')

  // 测试 skills 表是否有 source_type 字段
  const { error: testError } = await supabase.from('skills').select('source_url, source_type').limit(1)
  
  if (testError && testError.message.includes('column')) {
    console.error('❌ skills 表缺少 source_url/source_type 字段')
    console.log('\n📝 请在 Supabase Dashboard (SQL Editor) 执行：\n')
    console.log('ALTER TABLE skills')
    console.log('  ADD COLUMN IF NOT EXISTS source_url TEXT,')
    console.log('  ADD COLUMN IF NOT EXISTS source_type TEXT DEFAULT \'manual\';')
    console.log('')
    console.log('ALTER TABLE blog_posts')
    console.log('  ADD COLUMN IF NOT EXISTS source_url TEXT,')
    console.log('  ADD COLUMN IF NOT EXISTS source_type TEXT DEFAULT \'manual\';')
    console.log('')
    process.exit(1)
  }

  console.log('✅ 数据库字段已就绪\n')
}

initDatabase().catch(console.error)
