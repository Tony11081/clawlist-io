-- 为 skills 表添加来源追踪字段
ALTER TABLE skills
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS source_type TEXT DEFAULT 'manual';

-- 为 blog_posts 表添加来源追踪字段（如果表存在）
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS source_type TEXT DEFAULT 'manual';
