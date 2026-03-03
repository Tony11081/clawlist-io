# ClawList 网站优化计划

## 项目信息
- **项目名称**: ClawList.io
- **当前状态**: MVP 已部署，部分页面未完成
- **Stitch 设计**: projects/13308918153950367510
- **设计查看**: https://stitch.withgoogle.com/

## 第一阶段：页面审计（已完成）

### 现有页面
✅ 已实现的页面：
- `/` - 首页
- `/skills` - Skills 列表页
- `/skills/[slug]` - Skills 详情页
- `/guides` - Guides 列表页
- `/guides/[slug]` - Guides 详情页
- `/recipes` - Recipes 列表页
- `/recipes/[slug]` - Recipes 详情页
- `/models` - Models 指南页
- `/security` - Security 中心页
- `/compare` - 对比页
- `/api-marketplace` - API 市场
- `/submit` - 提交页面
- `/auth/login` - 登录页
- `/privacy` - 隐私政策
- `/terms` - 服务条款

### 需要补充的页面
❌ 缺失或未完成的页面：
1. `/about` - 关于页面
2. `/contact` - 联系页面
3. `/faq` - 常见问题
4. `/blog` - 博客列表
5. `/blog/[slug]` - 博客详情
6. `/authors` - 作者页面
7. `/authors/[slug]` - 作者详情
8. `/categories` - 分类页面
9. `/tags` - 标签页面
10. `/search` - 搜索结果页
11. `/dashboard` - 用户仪表板
12. `/profile` - 用户资料
13. `/settings` - 用户设置
14. `/admin` - 管理后台
15. `/404` - 自定义 404 页面
16. `/500` - 自定义错误页面

## 第二阶段：UI 设计优化

### Stitch AI 设计
✅ 已生成 Stitch 设计项目
- 项目 ID: `projects/13308918153950367510`
- 设计风格：现代、专业、蓝紫色主题
- 响应式设计：支持桌面和移动端

### 设计系统更新
需要更新的组件：
1. **导航栏** - 更现代的设计，添加搜索框
2. **Hero Section** - 更吸引人的主视觉
3. **卡片组件** - 统一的卡片样式
4. **按钮** - 更清晰的视觉层级
5. **表单** - 更好的用户体验
6. **Footer** - 完整的页脚信息

### 配图更新
✅ 已生成新配图（使用 gemini-3.1-flash-image-preview）
- hero.png - 主视觉图
- feature-1/2/3.png - 功能图标
- about.png - 关于图片
- cta.png - 行动号召背景

## 第三阶段：页面补充计划

### 优先级 P0（必须完成）

#### 1. 关于页面 (`/about`)
**内容：**
- ClawList 的使命和愿景
- 团队介绍
- 发展历程
- 联系方式

**设计：**
- Hero section with mission statement
- Team cards with photos
- Timeline of milestones
- CTA to join community

#### 2. 联系页面 (`/contact`)
**内容：**
- 联系表单（姓名、邮箱、消息）
- 社交媒体链接
- 常见问题快速链接

**设计：**
- Simple, clean form
- Contact information sidebar
- Social media icons

#### 3. 自定义 404 页面
**内容：**
- 友好的错误提示
- 返回首页链接
- 热门页面推荐
- 搜索框

**设计：**
- Playful illustration
- Clear navigation options
- Search functionality

### 优先级 P1（重要）

#### 4. 搜索结果页 (`/search`)
**功能：**
- 全站搜索
- 筛选器（Skills/Guides/Recipes）
- 排序选项
- 分页

#### 5. 用户仪表板 (`/dashboard`)
**功能：**
- 用户统计
- 收藏的 Skills
- 最近浏览
- 贡献历史

#### 6. 用户资料 (`/profile`)
**功能：**
- 个人信息展示
- 贡献列表
- 活动历史
- 编辑资料

### 优先级 P2（可选）

#### 7. 博客系统
- `/blog` - 博客列表
- `/blog/[slug]` - 博客详情
- `/authors` - 作者列表
- `/authors/[slug]` - 作者详情

#### 8. 分类和标签
- `/categories` - 分类浏览
- `/tags` - 标签云

#### 9. 管理后台
- `/admin` - 管理仪表板
- 内容审核
- 用户管理
- 统计分析

## 第四阶段：实施步骤

### Step 1: 设计系统更新
```bash
# 1. 从 Stitch 导出设计
# 2. 更新 Tailwind 配置
# 3. 更新组件库
# 4. 应用新配图
```

### Step 2: 补充 P0 页面
```bash
# 1. 创建 /about 页面
# 2. 创建 /contact 页面
# 3. 创建自定义 404 页面
```

### Step 3: 补充 P1 页面
```bash
# 1. 实现搜索功能
# 2. 创建用户仪表板
# 3. 创建用户资料页
```

### Step 4: 测试和优化
```bash
# 1. 测试所有页面
# 2. 修复 bug
# 3. 性能优化
# 4. SEO 优化
```

### Step 5: 部署
```bash
# 1. 提交到 GitHub
# 2. 部署到 Vercel
# 3. 验证生产环境
```

## 第五阶段：技术实现

### 使用的工具和技术
- **Stitch AI**: UI 设计生成
- **Gemini AI**: 配图生成
- **Claude AI**: 代码生成和架构
- **Supabase**: 数据库和认证
- **Vercel**: 部署平台

### 代码结构
```
app/
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
├── search/
│   └── page.tsx
├── dashboard/
│   └── page.tsx
├── profile/
│   └── page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── authors/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── not-found.tsx
└── error.tsx
```

## 时间估算

- **设计系统更新**: 2-3 小时
- **P0 页面补充**: 3-4 小时
- **P1 页面补充**: 4-5 小时
- **P2 页面补充**: 6-8 小时
- **测试和优化**: 2-3 小时
- **总计**: 17-23 小时

## 成功标准

✅ 所有 MVP 页面完整且功能正常
✅ 无 404 错误（除了真正不存在的资源）
✅ 设计统一且专业
✅ 响应式设计在所有设备上正常
✅ 性能良好（Lighthouse 分数 > 90）
✅ SEO 优化完成
✅ 可访问性达标（WCAG AA）

## 下一步行动

1. ✅ 生成 Stitch 设计
2. ⏳ 查看和调整 Stitch 设计
3. ⏳ 导出设计资产
4. ⏳ 开始实施 P0 页面
5. ⏳ 测试和部署
