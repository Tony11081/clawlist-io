import pg from 'pg'
import { readFileSync } from 'fs'

const { Client } = pg

const client = new Client({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.ygnbikloljpjzkxxcoar',
  password: 'ClawList2026!Secure',
  ssl: { rejectUnauthorized: false }
})

async function init() {
  try {
    console.log('🔄 连接数据库...')
    await client.connect()
    console.log('✅ 已连接')
    
    console.log('🔄 读取 SQL 文件...')
    const sql = readFileSync('./scripts/init-db.sql', 'utf-8')
    
    console.log('🔄 执行 SQL...')
    await client.query(sql)
    console.log('✅ SQL 执行完成')
    
    // 验证数据
    const result = await client.query('SELECT COUNT(*) FROM skills')
    console.log(`✅ Skills 表已创建，包含 ${result.rows[0].count} 条记录`)
    
    // 显示前 3 条
    const skills = await client.query('SELECT name, slug, category FROM skills LIMIT 3')
    console.log('\n📋 示例数据:')
    skills.rows.forEach(s => console.log(`  - ${s.name} (${s.category})`))
    
  } catch (error) {
    console.error('❌ 错误:', error.message)
  } finally {
    await client.end()
  }
}

init()
