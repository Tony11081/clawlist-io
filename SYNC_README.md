# ClawList.io 自动同步系统

从 X 书签自动筛选内容，用 AI 生成 Skills 和博客文章，录入到 ClawList.io。

## 功能特性

### 1. Skills 自动录入
- 使用 **Claude Haiku 4.5**（Kuai 最低成本）分析内容
- 自动判断是否适合作为 OpenClaw skill
- 提取标题、摘要、分类、标签

### 2. 博客自动生成
- 使用 **Claude Sonnet 4.6**（Kuai 高质量模型）生成完整英文博客
- 800-1200 字专业技术文章
- Markdown 格式，包含代码示例
- 自动计算阅读时间
- SEO 优化

### 3. SEO 优化
- 动态 sitemap.xml（包含所有 skills 和博客）
- robots.txt 配置
- JSON-LD 结构化数据
- OpenGraph 和 Twitter Card 元数据
- 语义化 HTML 和 heading 结构

## 数据源

**braindump.md** (`~/clawd/memory/braindump.md`)
- 8333+ 行 X 书签和随口想法
- 由 OpenClaw 的 `bookmarks-sync.js` 每日自动同步
- 包含技术文章、工具推荐、开发技巧等

## 使用方法

### 1. 创建数据库表

在 Supabase Dashboard SQL Editor 执行：

\`\`\`sql
-- 见 scripts/migrations/003_blog_posts.sql
\`\`\`

### 2. 手动运行同步

\`\`\`bash
# 处理 5 条内容
SYNC_LIMIT=5 npm run sync:bookmarks

# 处理 20 条内容
SYNC_LIMIT=20 npm run sync:bookmarks
\`\`\`

### 3. 自动持续同步

\`\`\`bash
# 每 30 秒处理 5 条，持续运行
./scripts/auto-sync.sh
\`\`\`

### 4. 停止自动同步

\`\`\`bash
ps aux | grep auto-sync.sh | grep -v grep | awk '{print $2}' | xargs kill
\`\`\`

## 配置

### 环境变量 (.env.local)

\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ygnbikloljpjzkxxcoar.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# X/Twitter (可选，如果直接用 bird CLI)
BIRD_AUTH_TOKEN=your_auth_token
BIRD_CT0=your_ct0
\`\`\`

### Kuai API

脚本内置 Kuai API key，使用两个模型：
- **claude-haiku-4-5-20251001**: 内容筛选（低成本）
- **claude-sonnet-4-6**: 博客生成（高质量）

## 工作流程

\`\`\`
braindump.md (8333 条)
    ↓
AI 分析 (Claude Haiku)
    ↓
分类: skill / blog / none
    ↓
├─ skill → 直接录入 skills 表
└─ blog → AI 生成完整文章 (Claude Sonnet) → 录入 blog_posts 表
    ↓
网站自动显示 (revalidate: 300s)
\`\`\`

## 已录入数据

- **Skills**: 24+ 个（包括 Electron 自动化、OpenClaw 控制中心等）
- **Blog**: 待生成（需先创建 blog_posts 表）

## 限流处理

Kuai API 限流：429 错误，需等待 120 秒
- 脚本会自动跳过失败的请求
- 状态文件记录已处理 ID，避免重复

## 页面路由

- `/blog` - 博客列表
- `/blog/[slug]` - 博客详情
- `/skills` - Skills 列表
- `/skills/[slug]` - Skill 详情

## SEO 文件

- `/sitemap.xml` - 动态生成，包含所有页面
- `/robots.txt` - 搜索引擎爬虫配置
- JSON-LD 结构化数据（在 layout.tsx）

## 下一步

1. 在 Supabase 执行 `003_blog_posts.sql` 创建表
2. 运行 `SYNC_LIMIT=10 npm run sync:bookmarks` 测试
3. 访问 https://clawlist.io/blog 查看博客
4. 设置 cron job 或 GitHub Action 定期运行同步
