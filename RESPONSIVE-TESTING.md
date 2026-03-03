# 响应式布局测试指南

## 启动开发服务器

在项目根目录运行：

```bash
cd /Users/chengyadong/clawd/projects/clawlist-app
npm run dev
```

服务器将在 http://localhost:3000 启动

## 测试页面列表

### 1. Homepage (主页)
**URL**: http://localhost:3000

**测试要点**：
- [ ] Hero 区域在移动端正确堆叠（文字在上，终端模拟在下）
- [ ] Quick Start 卡片在移动端变为单列
- [ ] Trending Skills 在移动端变为单列
- [ ] Security Notice 横幅在移动端正确换行
- [ ] 导航栏在移动端隐藏部分菜单项

**断点测试**：
- 手机 (< 768px)
- 平板 (768px - 1024px)
- 桌面 (> 1024px)

---

### 2. Guides & Tutorials (教程页面)
**URL**: http://localhost:3000/guides

**测试要点**：
- [ ] 面包屑导航在所有尺寸下可见
- [ ] 分类卡片在移动端变为 2 列
- [ ] 筛选标签在移动端正确换行
- [ ] 教程卡片在移动端变为单列布局
- [ ] 作者信息和按钮在移动端正确堆叠
- [ ] 分页控件在移动端保持可用

**断点测试**：
- 手机 (< 768px): 2 列分类卡片，单列教程卡片
- 平板 (768px - 1024px): 4 列分类卡片，单列教程卡片
- 桌面 (> 1024px): 4 列分类卡片，完整布局

---

### 3. Skills Library (技能库)
**URL**: http://localhost:3000/skills

**测试要点**：
- [ ] 搜索框在移动端占满宽度
- [ ] 分类筛选标签在移动端正确换行
- [ ] 技能卡片网格响应式变化（1/2/3 列）
- [ ] 卡片内容在移动端不溢出
- [ ] 统计信息（Stars, Downloads）在移动端可见
- [ ] Load More 按钮在所有尺寸下居中

**断点测试**：
- 手机 (< 768px): 1 列
- 平板 (768px - 1024px): 2 列
- 桌面 (> 1024px): 3 列

---

### 4. API Marketplace (API 市场)
**URL**: http://localhost:3000/api-marketplace

**测试要点**：
- [ ] 状态指示器在移动端可见
- [ ] 分类标签在移动端可横向滚动
- [ ] API 提供商卡片网格响应式变化（1/2/3 列）
- [ ] 卡片内的功能列表在移动端不溢出
- [ ] 按钮在移动端占满卡片宽度
- [ ] Info Banner 在移动端正确堆叠

**断点测试**：
- 手机 (< 768px): 1 列，标签可滚动
- 平板 (768px - 1024px): 2 列
- 桌面 (> 1024px): 3 列

---

### 5. Recipes (配方页面)
**URL**: http://localhost:3000/recipes

**测试要点**：
- [ ] 筛选标签在移动端正确换行
- [ ] 配方卡片网格响应式变化（1/2/3 列）
- [ ] 卡片内的详细信息在移动端对齐良好
- [ ] 按钮在移动端占满卡片宽度
- [ ] Custom Recipe Banner 在移动端正确堆叠

**断点测试**：
- 手机 (< 768px): 1 列
- 平板 (768px - 1024px): 2 列
- 桌面 (> 1024px): 3 列

---

### 6. Security Center (安全中心)
**URL**: http://localhost:3000/security

**测试要点**：
- [ ] Alert Banner 在移动端正确堆叠
- [ ] 安全卡片在移动端占满宽度
- [ ] 图标和标题在移动端对齐良好
- [ ] 检查清单在移动端可读
- [ ] CTA 按钮在移动端居中

**断点测试**：
- 手机 (< 768px): 单列布局
- 平板 (768px - 1024px): 单列布局
- 桌面 (> 1024px): 单列布局（最大宽度限制）

---

## 测试工具

### Chrome DevTools
1. 打开 Chrome DevTools (F12)
2. 点击 Toggle Device Toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. 选择预设设备或自定义尺寸

### 推荐测试设备尺寸

**手机**：
- iPhone SE (375px)
- iPhone 12/13/14 (390px)
- iPhone 14 Pro Max (430px)
- Samsung Galaxy S20 (360px)

**平板**：
- iPad Mini (768px)
- iPad Air (820px)
- iPad Pro (1024px)

**桌面**：
- Laptop (1280px)
- Desktop (1440px)
- Large Desktop (1920px)

---

## 常见问题检查清单

### 布局问题
- [ ] 内容不会横向溢出
- [ ] 文字在小屏幕上可读（不会太小）
- [ ] 按钮和链接有足够的点击区域（至少 44x44px）
- [ ] 图片和图标正确缩放

### 导航问题
- [ ] 面包屑导航在所有尺寸下可见
- [ ] 链接和按钮在移动端易于点击
- [ ] 悬停效果在触摸设备上有替代方案

### 性能问题
- [ ] 页面加载速度快（< 3 秒）
- [ ] 图片懒加载正常工作
- [ ] 字体加载不会导致布局偏移

### 视觉问题
- [ ] 圆角在所有尺寸下一致
- [ ] 间距和边距在移动端合理
- [ ] 深色模式在所有页面正常工作
- [ ] 颜色对比度符合 WCAG 标准

---

## 快速测试命令

### 测试所有断点
```bash
# 在浏览器中依次访问：
open http://localhost:3000
open http://localhost:3000/guides
open http://localhost:3000/skills
open http://localhost:3000/api-marketplace
open http://localhost:3000/recipes
open http://localhost:3000/security
```

### 检查构建
```bash
npm run build
npm run start
# 访问 http://localhost:3000 测试生产构建
```

---

## 报告问题

如果发现问题，记录以下信息：
1. **页面 URL**
2. **设备/屏幕尺寸**
3. **浏览器版本**
4. **问题描述**
5. **截图**（如果可能）

---

## 测试完成后

- [ ] 所有页面在手机上正常显示
- [ ] 所有页面在平板上正常显示
- [ ] 所有页面在桌面上正常显示
- [ ] 深色模式在所有页面正常工作
- [ ] 所有交互元素可点击/触摸
- [ ] 没有横向滚动条（除非有意设计）
- [ ] 文字大小合适，易于阅读

测试通过后，可以继续部署到生产环境！
