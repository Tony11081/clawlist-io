import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  'https://ygnbikloljpjzkxxcoar.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmJpa2xvbGpwanpreHhjb2FyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ5OTA5NSwiZXhwIjoyMDg4MDc1MDk1fQ.h6X6UBVjEQjzs0kmJea-xwfOWvCxsbtUkihlAbb2r60'
)

async function init() {
  console.log('🔄 读取 SQL 文件...')
  const sql = readFileSync('./scripts/init-db.sql', 'utf-8')
  
  console.log('🔄 执行 SQL...')
  const { data, error } = await supabase.rpc('exec', { sql })
  
  if (error) {
    console.error('❌ 错误:', error)
  } else {
    console.log('✅ 数据库初始化完成！')
    console.log('📊 数据:', data)
  }
  
  // 验证数据
  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select('*')
    .limit(5)
  
  if (skillsError) {
    console.error('❌ 查询失败:', skillsError)
  } else {
    console.log(`✅ 已插入 ${skills?.length || 0} 条示例数据`)
    console.log(skills)
  }
}

init().catch(console.error)
