# ClawList.io 项目信息

## 项目概述
- **名称**: ClawList.io
- **定位**: OpenClaw 资源导航 + 教程中心 + Skill 插件库 + 岗位预设配置库
- **状态**: ✅ 已上线
- **网址**: https://clawlist.io
- **GitHub**: https://github.com/Tony11081/clawlist-io

## 技术栈
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- 部署：Vercel
- DNS：Cloudflare

## 项目位置
- **源码**: `~/clawd/projects/clawlist-app`
- **设计文档**: `~/clawd/projects/clawlist/docs`
- **数据库设计**: `~/clawd/projects/clawlist/database`

## 开发团队（tmux sessions）
修改网站时，使用三个 AI 协作：

```bash
# 启动三个 tmux session
tmux new-session -d -s clawlist-codex
tmux new-session -d -s clawlist-claude  
tmux new-session -d -s clawlist-gemini

# 分工
- Claude Code (clawlist-claude): 架构、复杂逻辑、API 设计
- Codex (clawlist-codex): 后端代码、数据处理、测试
- Gemini (clawlist-gemini): UI/UX、前端组件、样式
```

## 快速启动

### 本地开发
```bash
cd ~/clawd/projects/clawlist-app
npm run dev
# 访问 http://localhost:3000
```

### 修改并部署
```bash
cd ~/clawd/projects/clawlist-app
# 1. 修改代码
# 2. 提交
git add .
git commit -m "描述修改"
git push
# 3. Vercel 自动部署（1-2 分钟）
```

### 用 AI 团队修改
```bash
# 1. 确保 tmux sessions 存在
tmux ls | grep clawlist

# 2. 告诉 Clawdbot 你的需求
# 例如："用 tmux 里的团队给 Skills 页面添加搜索功能"

# 3. Clawdbot 会：
#    - 分配任务给三个 AI
#    - 监控进度
#    - 整合代码
#    - 提交并部署
```

## 已完成功能
- ✅ 首页（Hero + Trending Skills + 快速开始 + 安全公告）
- ✅ Skills 列表页 + 详情页（搜索/筛选/安装命令）
- ✅ Guides 列表页（教程分类）
- ✅ Recipes 列表页（岗位配方）
- ✅ Models 指南页（模型对比 + 选择器）
- ✅ Security 中心页（安全清单）
- ✅ 响应式设计 + 暗黑模式
- ✅ 自定义域名 clawlist.io

## 待开发功能（V1）
- [ ] Supabase 数据库集成
- [ ] 用户登录与收藏
- [ ] 后台内容管理
- [ ] 真实数据替换 Mock 数据
- [ ] 评论与 Upvote 功能
- [ ] SEO 优化（sitemap/robots.txt）

## 部署信息
- **Vercel Project ID**: prj_hdiGrqcKcwT1NMivWmOrOxWGDoLu
- **Vercel Token**: 存储在 `~/.vercel/auth.json`
- **Cloudflare Zone ID**: 3d99f49d68fa924308c11841b6a9861a
- **DNS**: konnor.ns.cloudflare.com, zainab.ns.cloudflare.com

## 重要文件
```
clawlist-app/
├── app/
│   ├── page.tsx              # 首页
│   ├── skills/               # Skills 相关页面
│   ├── guides/               # Guides 相关页面
│   ├── recipes/              # Recipes 相关页面
│   ├── models/               # Models 指南页
│   ├── security/             # Security 中心页
│   └── layout.tsx            # 全局布局
├── components/
│   ├── navigation.tsx        # 导航栏
│   ├── footer.tsx            # 页脚
│   └── ui/                   # shadcn/ui 组件
├── Dockerfile                # Docker 构建文件
└── next.config.ts            # Next.js 配置（standalone 模式）
```

## 常见任务

### 添加新页面
```bash
# 1. 创建页面文件
mkdir -p app/new-page
touch app/new-page/page.tsx

# 2. 添加到导航栏
# 编辑 components/navigation.tsx

# 3. 提交部署
git add . && git commit -m "Add new page" && git push
```

### 修改样式
```bash
# 全局样式：app/globals.css
# 组件样式：使用 Tailwind classes
# 主题色：design/design-system.md
```

### 调试
```bash
# 本地运行
npm run dev

# 查看构建日志
vercel logs

# 查看部署状态
vercel ls
```

## 联系方式
- **项目负责人**: Tony
- **AI 助手**: Clawdbot (OpenClaw)
- **GitHub Issues**: https://github.com/Tony11081/clawlist-io/issues
