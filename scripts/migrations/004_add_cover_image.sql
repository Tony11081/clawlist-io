-- 添加 cover_image 字段到 blog_posts 表
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT;

-- 添加索引（可选，如果需要按封面图筛选）
-- CREATE INDEX IF NOT EXISTS idx_blog_posts_cover_image ON blog_posts(cover_image);
