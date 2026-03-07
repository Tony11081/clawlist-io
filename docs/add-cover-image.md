# 添加 cover_image 字段到 blog_posts 表

## 方法 1: 通过 Supabase Dashboard（推荐）

1. 访问 Supabase Dashboard: https://supabase.com/dashboard/project/ygnbikloljpjzkxxcoar
2. 进入 SQL Editor
3. 运行以下 SQL:

```sql
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT;
```

## 方法 2: 通过命令行

```bash
cd ~/clawd/projects/clawlist-app
node --env-file=.env.local scripts/add-cover-image-field.mjs
```

## 字段说明

- **字段名**: `cover_image`
- **类型**: `TEXT`
- **可选**: 是（NULL 时显示占位符图标）
- **用途**: 存储文章封面图 URL

## 使用示例

### 添加封面图到现有文章

```sql
UPDATE blog_posts
SET cover_image = 'https://example.com/image.jpg'
WHERE slug = 'your-article-slug';
```

### 在同步脚本中添加封面图

编辑 `scripts/sync-x-bookmarks.mjs`，在插入数据时添加 `cover_image` 字段：

```javascript
const { data, error } = await supabase
  .from('blog_posts')
  .insert({
    title: '...',
    slug: '...',
    content: '...',
    cover_image: 'https://example.com/cover.jpg', // 添加这一行
    // ... 其他字段
  })
```

## 前端显示

Guides 列表页已更新，会自动显示封面图：
- 如果有 `cover_image`：显示图片（带 hover 缩放效果）
- 如果没有：显示占位符图标

访问 https://clawlist.io/guides 查看效果。
