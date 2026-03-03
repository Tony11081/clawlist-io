import { readFileSync } from 'fs'

const MANAGEMENT_TOKEN = 'sbp_ef2e4b7efdb604832e4fd3d7d36500686f8b8bf3'
const PROJECT_REF = 'ygnbikloljpjzkxxcoar'

async function executeSql(sql) {
  const response = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MANAGEMENT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: sql })
    }
  )
  
  const result = await response.json()
  return result
}

async function init() {
  console.log('🔄 读取 SQL 文件...')
  const sql = readFileSync('./scripts/init-db.sql', 'utf-8')
  
  console.log('🔄 执行 SQL...')
  const result = await executeSql(sql)
  
  if (result.error) {
    console.error('❌ 错误:', result.error)
  } else {
    console.log('✅ 数据库初始化完成！')
    console.log(result)
  }
}

init()
