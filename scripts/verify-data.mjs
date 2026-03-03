import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ygnbikloljpjzkxxcoar.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmJpa2xvbGpwanpreHhjb2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0OTkwOTUsImV4cCI6MjA4ODA3NTA5NX0._6o9uZMuOK3HvMksWQ7z2zyOi6KrNBJ94pnoQkQ_SPA'
)

async function verify() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('upvotes', { ascending: false })
    .limit(5)
  
  if (error) {
    console.error('❌ 错误:', error.message)
  } else {
    console.log(`✅ 数据库中有 ${data.length} 条 Skills`)
    console.log('\n🔥 Top 5 Skills:')
    data.forEach((s, i) => {
      console.log(`${i + 1}. ${s.name} - ${s.upvotes} upvotes (${s.category})`)
    })
  }
}

verify()
