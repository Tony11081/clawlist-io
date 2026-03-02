# ClawList.io

一站式 OpenClaw 教程、Skills、岗位配置、模型与算力选择聚合站

## 功能特性

- 📚 **Guides** - 从本地到云端的完整部署教程
- 🔌 **Skills** - 可搜索、可筛选的插件库，标注风险等级
- 🎯 **Recipes** - 岗位专属配置，开箱即用
- 🤖 **Models** - 模型对比与选择器
- 🔒 **Security** - 安全中心与防护清单

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **部署**: Vercel

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Tony11081/clawlist-io)

### 手动部署

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

## MVP 范围

- [x] 首页（Hero + Trending + 安全公告）
- [x] Skills 列表页 + 详情页
- [x] Guides 列表页
- [x] Recipes 列表页
- [x] Models 指南页
- [x] Security 中心页
- [ ] 后台管理（V1）
- [ ] Supabase 集成（V1）
- [ ] 用户登录与收藏（V1）

## 路线图

### V1
- 用户登录与收藏
- Supabase 数据库集成
- 后台内容管理
- 评论与 Upvote 功能

### V2
- 配方生成器
- Skill 风险扫描
- 团队版模板库

## License

MIT

## 贡献

欢迎提交 Issue 和 PR！

## 相关链接

- [OpenClaw 官网](https://openclaw.ai)
- [OpenClaw 文档](https://docs.openclaw.ai)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [Discord 社区](https://discord.com/invite/clawd)
