# ClawList.io - Product Requirements Document

## 项目概述

**产品名称**: ClawList.io
**定位**: OpenClaw 生态系统的资源中心
**目标用户**: 全球开发者，使用 OpenClaw 构建 AI 自动化
**核心价值**: 提供可信赖的 Skills 库、教程、配方和模型指南，强调安全性和可控性

## 设计要求

### 视觉风格
- **极简美学**: 苹果风格的简约设计
- **配色方案**: 严格单色调 - 黑色 (#000000)、白色 (#FFFFFF)、中性灰色系
- **禁止颜色**: 不使用蓝色、紫色或其他彩色
- **风格特征**:
  - 极客/科技感
  - 高对比度
  - 圆角设计 (16-24px radius)
  - 大量留白
  - 微妙阴影和悬停效果

### 技术栈
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui 组件库
- Supabase (数据库 + 认证)

## 网站结构

### 1. 首页 (/)
**目标**: 快速传达价值，引导用户探索

**核心元素**:
- Hero 区域: 简洁标题 + 描述 + 双 CTA (Get Started / Browse Skills)
- 快速开始: 3 步流程卡片 (Deploy → Install → Import)
- 热门 Skills: 3 个精选 Skill 卡片，带风险标签和复制按钮
- 安全提示: 突出显示安全最佳实践
- 功能特性: 3 个特性展示 (Quick Deploy / Detailed Guides / Security First)

**设计重点**:
- 单色调渐变背景
- 卡片式布局，带微妙边框
- 圆角按钮和卡片
- 悬停动画 (scale, translate)

### 2. Skills 库 (/skills)
**目标**: 浏览、搜索和发现 OpenClaw Skills

**核心功能**:
- 搜索栏: 全文搜索 (名称 + 描述 + 标签)
- 筛选器: 风险等级、分类、平台
- Skills 网格: 卡片展示，包含:
  - Skill 名称
  - 简短描述
  - 风险等级徽章 (Low/Medium/High)
  - 标签
  - Upvote 数量
  - "View Details" 按钮

**设计重点**:
- 清晰的信息层级
- 风险等级用不同灰度表示
- 悬停效果增强交互感

### 3. Skill 详情页 (/skills/[slug])
**目标**: 提供完整的 Skill 信息和安装指南

**核心元素**:
- 面包屑导航
- Skill 标题 + 风险徽章
- 统计信息 (stars, upvotes, views)
- 安装命令卡片 (带复制按钮)
- 功能说明
- 安全与权限 (突出显示)
- 操作按钮 (查看源码, Upvote)

**设计重点**:
- 安全信息用边框和图标突出
- 代码块使用等宽字体
- 清晰的视觉分隔

### 4. Guides 教程 (/guides)
**目标**: 提供从部署到集成的完整教程

**核心元素**:
- 分类卡片 (Local Deployment / Cloud Deployment / Integration)
- 教程列表: 每个教程显示:
  - 标题和描述
  - 分类标签
  - 难度级别
  - 阅读时间
  - "阅读教程" 按钮

**设计重点**:
- 列表式布局
- 清晰的分类视觉区分

### 5. Recipes 配方 (/recipes)
**目标**: 提供预设的工作流配置

**核心元素**:
- Recipe 卡片网格
- 每个 Recipe 显示:
  - 标题和描述
  - 角色类型
  - 难度级别
  - Skills 数量
  - 风险等级

### 6. Models 模型指南 (/models)
**目标**: 帮助用户选择合适的 AI 模型

**核心元素**:
- 模型对比表格
- 模型选择器 (交互式)
- API Key 接入指南
- 安全提示

### 7. API Marketplace (/api-marketplace)
**目标**: 对比 AI API 提供商

**核心元素**:
- 快速对比表格
- 提供商详细卡片
- 成本计算器 (Coming soon)
- 集成指南

### 8. Security 安全中心 (/security)
**目标**: 教育用户安全最佳实践

**核心元素**:
- 安全检查清单
- 最佳实践指南
- 风险等级说明

### 9. Compare 对比工具 (/compare)
**目标**: 并排对比最多 3 个 Skills

**核心功能**:
- Skill 选择器 (搜索)
- 对比表格:
  - 安装命令
  - 风险等级
  - 依赖项
  - 权限
  - 平台支持
  - 价格
  - Upvotes

### 10. 404 页面 (/not-found)
**目标**: 友好的错误处理

**核心元素**:
- 大号 404 标题
- 简短说明
- 3 个导航卡片 (Home / Browse Skills / Read Guides)

## 通用组件

### Navigation 导航栏
- Logo (ClawList.io)
- 导航链接: Guides, Skills, Recipes, API Market, Models, Security
- Submit 按钮
- 移动端汉堡菜单

### Footer 页脚
- 4 列布局:
  - ClawList.io 简介
  - Resources (Guides, Skills, Recipes)
  - Community (GitHub, Discord, Docs)
  - Security (Security Center, API Key Safety)
- 版权信息

### 通用设计模式
- **卡片**: 白色背景 (dark: 深灰), 边框, 圆角, 悬停阴影
- **按钮**: 圆角, 黑色主按钮, 轮廓次要按钮
- **徽章**: 圆角, 单色调, 不同灰度表示不同状态
- **输入框**: 圆角, 边框, focus 状态
- **代码块**: 等宽字体, 灰色背景, 复制按钮

## 数据模型

### Skills
- id, name, slug, summary, description
- tags, category, github_url, stars
- install_cmd, permissions, risk_level
- upvotes, views, created_at

### Recipes
- id, title, slug, summary
- role_type, difficulty, tags
- skills_count, risk_level

### Guides
- id, title, slug, description
- category, difficulty, readTime

## 安全设计原则

1. **风险可见性**: 所有 Skills 必须显示风险等级
2. **权限透明**: 清晰列出所需权限
3. **安全提示**: 在关键操作前提供警告
4. **最佳实践**: 教育用户安全使用

## 响应式设计

- **移动端优先**: 所有页面必须在移动端完美展示
- **断点**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **适配策略**:
  - 移动端: 单列布局, 汉堡菜单
  - 平板: 2 列网格
  - 桌面: 3 列网格, 侧边栏筛选

## 性能要求

- 首屏加载 < 2s
- 图片懒加载
- 代码分割
- 静态生成 (SSG) 用于营销页面
- 服务端渲染 (SSR) 用于动态内容

## 可访问性 (A11y)

- WCAG AA 标准
- 键盘导航支持
- 语义化 HTML
- ARIA 标签
- 高对比度
- Focus 状态清晰可见
