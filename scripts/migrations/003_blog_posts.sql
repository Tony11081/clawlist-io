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
