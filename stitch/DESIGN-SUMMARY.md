# ClawList UI 设计总结

## Stitch 项目信息
- **项目 ID**: projects/368485836602389172
- **项目 URL**: https://stitch.withgoogle.com/project/projects/368485836602389172
- **创建时间**: 2026-03-03

## 设计风格
- **配色**: 严格单色调 - 黑色、白色、灰色系
- **风格**: 极简美学、苹果风格、极客/科技感
- **特点**: 高对比度、圆角设计、大量留白、微妙阴影

## 已生成的页面设计

### 1. 首页 (Homepage)
**变体数量**: 2 个

**设计元素**:
- Hero 区域: 大标题 "ClawList" + 描述 + CTA 按钮
- Quick Start: 3 步流程卡片 (Deploy, Install, Import)
- Trending Skills: 3 个精选 Skill 卡片
- Security Notice: 安全提示卡片
- Footer: 完整页脚信息

**截图位置**:
- `screenshots/variant-1.png` - 首页变体 1
- `screenshots/variant-2.png` - 首页变体 2

### 2. Skills 库页面 (Skills Library)
**变体数量**: 3 个（包含空状态）

**设计元素**:
- 页面标题 "Skills Library" + 描述
- 搜索栏（带图标）
- 筛选徽章: All, Code, Automation, Marketing, Social
- 3 列网格布局的 Skill 卡片
- 每个卡片包含:
  - Skill 名称
  - 简短描述
  - 风险等级徽章（不同灰度）
  - 标签（小药丸形状）
  - Upvote 数量
  - "View Details" 按钮
- "Load More" 按钮
- 空状态设计（无结果时）

**截图位置**:
- `screenshots/skills-library-v1.png` - Skills 库变体 1（Inter 字体，圆角）
- `screenshots/skills-library-v2.png` - Skills 库变体 2（Space Grotesk 字体，极客风）
- `screenshots/skills-library-empty.png` - 空状态设计

**设计特点**:
- **变体 1**: 更圆润，24px 圆角，Inter 字体，苹果风格
- **变体 2**: 更结构化，16px 圆角，Space Grotesk 字体，极客风格，网格线更明显
- **空状态**: 居中图标 + "No skills found" 提示

### 3. Skill 详情页 (Skill Detail)
**变体数量**: 1 个

**设计元素**:
- 面包屑导航: Skills / GitHub Issues
- 大标题 "GitHub Issues" + 风险徽章
- 统计信息行: ⭐ 245 stars, 👍 189 upvotes, 👁️ 1.2k views
- 安装命令卡片:
  - 灰色背景
  - 等宽字体: `npx skills add gh-issues`
  - 复制按钮
- 功能说明区域
- 安全与权限卡片:
  - 2px 边框突出显示
  - 警告盾牌图标
  - 权限列表（GitHub API, File system）
  - 安全提示文本
- 操作按钮:
  - "View Source Code"（黑色填充）
  - "Upvote"（轮廓）
- 相关 Skills 区域: 3 个小卡片

**截图位置**:
- `screenshots/skill-detail.png` - Skill 详情页

### 4. Guides 教程页 (Guides & Tutorials)
**变体数量**: 1 个

**设计元素**:
- 页面标题 "Guides & Tutorials" + 副标题
- 3 个分类卡片（横排）:
  - Local Deployment（笔记本图标）
  - Cloud Deployment（服务器图标）
  - Integration（消息图标）
- 教程列表（单列）:
  - 每个教程卡片横向布局
  - 左侧：标题、描述、分类徽章、难度徽章、阅读时间
  - 右侧："Read Tutorial" 按钮
- 简洁的线条图标
- 分类卡片有悬停效果

**截图位置**:
- `screenshots/guides.png` - Guides 教程页

### 5. Recipes 配方页 (Job Recipes)
**变体数量**: 1 个

**设计元素**:
- 页面标题 "Job Recipes" + 副标题
- 3 列网格布局的 Recipe 卡片
- 每个卡片包含:
  - Recipe 标题
  - 简短描述
  - 角色类型徽章
  - 难度徽章（Beginner/Intermediate/Advanced）
  - Skills 数量（如 "5 Skills"）
  - 风险等级徽章（不同灰度）
  - "View Recipe" 按钮
- 清晰的视觉层级
- 卡片悬停效果

**截图位置**:
- `screenshots/recipes.png` - Recipes 配方页

### 6. Models 模型指南 (Model Guide)
**变体数量**: 1 个

**设计元素**:
- 页面标题 "Model Guide" + 副标题
- 模型对比表格:
  - 列：Model, Speed, Cost, Context, Use Cases
  - 行：GPT-5.3 Codex, Claude Opus 4.6, Claude Sonnet 4.6, Gemini 3.1 Pro
- 模型选择器区域:
  - 问题："What do you need?"
  - 4 个选项按钮（2x2 网格）
- 推荐卡片显示建议的模型和特性
- API Key 设置区域:
  - 代码块显示环境变量
  - 安全警告卡片
- 清晰的表格边框和交替行背景

**截图位置**:
- `screenshots/models.png` - Models 模型指南页

### 7. API Marketplace (API 市场)
**变体数量**: 1 个

**设计元素**:
- 页面标题 "API Marketplace" + 副标题 + 联盟链接说明
- 快速对比表格:
  - 列：Provider（带 emoji）, Best For, Price, Context, Sign Up
  - 行：OpenAI, Anthropic, Google AI, Together AI
- 详细提供商卡片（2 列网格）:
  - 大 emoji 图标
  - 提供商名称 + Popular 徽章
  - 描述
  - 大号价格显示
  - Context window
  - 特性列表（带勾选标记）
  - "Get Started" 按钮
  - 佣金说明
- Cost Calculator 区域（Coming soon）
- Integration Guide 区域（3 步骤 + 代码块）

**截图位置**:
- `screenshots/api-marketplace.png` - API Marketplace 页

### 8. Security 安全中心 (Security Center)
**变体数量**: 1 个

**设计元素**:
- 页面标题 "Security Center" + 副标题
- 安全检查清单:
  - 大复选框图标
  - 每项包含标题和描述
- 风险等级说明卡片（3 列）:
  - Low Risk（浅灰）
  - Medium Risk（中灰）
  - High Risk（深灰）
  - 每个卡片显示图标、标题、描述、示例
- 最佳实践区域（编号提示）
- API Key 安全区域（Do/Don't 列表）
- 风险等级仅通过灰度区分
- 简洁的轮廓复选框

**截图位置**:
- `screenshots/security.png` - Security 安全中心页

### 9. Compare 对比工具 (Compare Skills)
**变体数量**: 1 个

**设计元素**:
- 页面标题 "Compare Skills" + 副标题
- Skill 选择器区域:
  - 搜索栏
  - "Add Skills to Compare (0/3)" 计数器
  - 3 个可选 Skill 卡片
- 对比表格:
  - Skills 作为列
  - 特性作为行：Install Command, Risk Level, Dependencies, Permissions, Platforms, Price, Upvotes
  - 列标题显示 Skill 名称、描述、风险徽章、X 删除按钮
  - 底部操作按钮：View Details, Copy Install
- 空状态（无 Skills 选择时）
- 清晰的表格边框和交替行背景
- 代码片段使用等宽字体

**截图位置**:
- `screenshots/compare.png` - Compare 对比工具页

## 设计系统规范

### 颜色
- **背景**: #000000 (黑色), #FFFFFF (白色)
- **灰色系**: #262626, #171717, #404040, #737373, #A3A3A3, #D4D4D4, #E5E5E5, #F5F5F5
- **禁止**: 蓝色、紫色或任何彩色

### 字体
- **主要**: Inter, Space Grotesk
- **代码**: JetBrains Mono, SF Mono, 等宽字体

### 圆角
- **卡片**: 16-24px
- **按钮**: 16-24px (rounded-full 或 rounded-2xl)
- **输入框**: 12-16px

### 间距
- **卡片间距**: 24px
- **内边距**: 16-32px
- **留白**: 大量使用，保持呼吸感

### 阴影
- **默认**: 微妙阴影
- **悬停**: 增强阴影 + 轻微缩放

## 下一步

### ✅ 已完成的页面（共 9 个）:
1. ✅ 首页 (Homepage) - 2 个变体
2. ✅ Skills 库页面 (Skills Library) - 3 个变体
3. ✅ Skill 详情页 (Skill Detail)
4. ✅ Guides 教程页 (Guides & Tutorials)
5. ✅ Recipes 配方页 (Job Recipes)
6. ✅ Models 模型指南 (Model Guide)
7. ✅ API Marketplace (API 市场)
8. ✅ Security 安全中心 (Security Center)
9. ✅ Compare 对比工具 (Compare Skills)

### 可选的额外页面:
- Guide 详情页 (/guides/[slug])
- Recipe 详情页 (/recipes/[slug])
- Submit 提交页面 (/submit)
- Login 登录页面 (/auth/login)

### 导出和集成:
1. ✅ 访问 Stitch 项目查看所有设计
2. 下载 HTML 代码
3. 提取组件和样式
4. 集成到 Next.js 项目中
5. 使用 Tailwind CSS 重构样式
6. 实现响应式布局
7. 添加交互动画

### 设计文件统计:
- **总页面数**: 9 个主要页面
- **总变体数**: 12 个设计变体
- **截图文件**: 12 个 PNG 文件
- **总大小**: ~640 KB

## 文件位置
- **PRD 文档**: `/Users/chengyadong/clawd/projects/clawlist-app/CLAWLIST-PRD.md`
- **项目信息**: `/Users/chengyadong/clawd/projects/clawlist-app/stitch/project-info.json`
- **截图目录**: `/Users/chengyadong/clawd/projects/clawlist-app/stitch/screenshots/`
