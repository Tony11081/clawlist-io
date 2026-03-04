# Kuai API 配额用完解决方案

## 问题
```
Token quota exhausted: [sk-ZaI***SPh] !token.UnlimitedQuota && token.RemainQuota = -102373
```

## 解决方法

### 1. 获取新的 Kuai API Key
访问 Kuai 平台获取新的 API key

### 2. 设置环境变量
在 `.env.local` 文件中添加：

```bash
KUAI_API_KEY=sk-your-new-api-key-here
```

### 3. 测试 API
```bash
# 使用新的 API key 测试
KUAI_API_KEY=sk-your-new-key SYNC_LIMIT=1 npm run sync:bookmarks
```

### 4. 运行同步
```bash
# 处理 5 条内容
SYNC_LIMIT=5 npm run sync:bookmarks

# 或使用自动同步脚本
./scripts/auto-sync.sh
```

## 当前状态

✅ **已完成的功能**
- 英文内容验证（标题、摘要、标签）
- GitHub URL 必需验证
- 安装命令提取和验证
- Claude Haiku 4.5 筛选
- Claude Sonnet 4.6 博客生成
- SEO 优化（sitemap, robots.txt, JSON-LD）

⚠️ **需要操作**
1. 在 Supabase 执行 `scripts/migrations/003_blog_posts.sql` 创建博客表
2. 设置新的 `KUAI_API_KEY` 环境变量
3. 运行同步测试

## 验证标准

### Skills 必需条件
- ✅ 有效的 GitHub URL（https://github.com/user/repo）
- ✅ 正确的安装命令（npm/npx/pip/cargo 等）
- ✅ 英文标题（max 60 chars）
- ✅ 英文摘要（max 150 chars）
- ✅ 英文标签

### Blog 内容
- ✅ 800-1200 字英文文章
- ✅ Markdown 格式
- ✅ 代码示例
- ✅ 实用建议
- ✅ SEO 优化

## 示例输出

### Skill 录入成功
```
📝 分析: Electron App Automation with agent-browser...
  ✅ Skill 已录入: Electron App Automation
     GitHub: https://github.com/vercel-labs/agent-browser
     Install: npm install agent-browser
```

### Blog 生成成功
```
📝 分析: AI Automation Best Practices...
    📝 生成博客内容（Claude Sonnet 4.6）...
  ✅ 博客已录入: AI Automation Best Practices (8 min read)
```
