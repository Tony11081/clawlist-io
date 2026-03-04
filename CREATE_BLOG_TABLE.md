# ⚠️ 紧急：需要创建 blog_posts 表

## 问题
流水线正在运行，博客内容已生成，但无法插入数据库：
```
❌ 插入博客失败: Could not find the table 'public.blog_posts' in the schema cache
```

## 解决方案

### 步骤 1：打开 Supabase SQL Editor
访问：https://supabase.com/dashboard/project/ygnbikloljpjzkxxcoar/sql/new

### 步骤 2：复制并执行以下 SQL

```sql
-- 创建 blog_posts 表
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  author TEXT DEFAULT 'ClawList Team',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  views INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 5
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- 启用 RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取
CREATE POLICY "Allow public read access" ON blog_posts
  FOR SELECT USING (true);

-- 只允许 service_role 写入
CREATE POLICY "Allow service role to insert" ON blog_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role to update" ON blog_posts
  FOR UPDATE USING (true);
```

### 步骤 3：点击 "Run" 执行

执行成功后，流水线会自动开始录入博客！

## 当前状态

✅ **流水线正在运行**
- 每 30 秒处理 5 条内容
- AI 已生成博客内容（Claude Sonnet 4.6）
- 等待数据库表创建后自动录入

⏳ **等待操作**
- 创建 blog_posts 表
- 流水线会自动继续工作

## 验证

执行 SQL 后，可以运行：
```sql
SELECT COUNT(*) FROM blog_posts;
```

应该看到博客开始被录入！
