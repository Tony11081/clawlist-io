# 手动导出 Stitch HTML 指南

## 问题说明

有 4 个页面的 HTML 无法通过 API 自动下载：
1. Homepage
2. Guides & Tutorials
3. API Marketplace
4. Skills Library V2

这是因为 Google Contribution 的下载链接需要浏览器 Cookie 认证，无法通过命令行直接访问。

## 手动导出步骤

### 方法 1: 在 Stitch 中导出（推荐）

1. 访问 Stitch 项目：
   https://stitch.withgoogle.com/project/projects/368485836602389172

2. 对于每个需要导出的页面：
   - 点击页面缩略图打开
   - 点击右上角的 "..." 菜单
   - 选择 "Export" 或 "Download HTML"
   - 保存文件

3. 将下载的文件重命名并移动到：
   `/Users/chengyadong/clawd/projects/clawlist-app/stitch/html/`

   文件命名：
   - `homepage.html` - ClawList Homepage Variant 1
   - `guides.html` - Guides & Tutorials Variant 2
   - `api-marketplace.html` - API Marketplace Variant 2
   - `skills-library-v2.html` - ClawList Skills Library Variant 2

### 方法 2: 使用浏览器开发者工具

1. 在 Stitch 中打开页面
2. 按 F12 打开开发者工具
3. 切换到 "Elements" 或 "Inspector" 标签
4. 右键点击 `<html>` 标签
5. 选择 "Copy" > "Copy outerHTML"
6. 粘贴到文本编辑器并保存为 .html 文件

### 方法 3: 使用浏览器的"另存为"

1. 在 Stitch 中打开页面的预览
2. 右键点击页面
3. 选择 "Save As" 或"另存为"
4. 保存为 HTML 文件

## 导出后的操作

导出完成后，运行以下命令检查文件：

```bash
cd /Users/chengyadong/clawd/projects/clawlist-app/stitch/html
ls -lh *.html
```

确保所有文件都不是 0 bytes。

## 当前状态

### ✅ 已成功下载（7 个）:
- skills-library.html (17.6 KB)
- skills-library-empty.html (8.3 KB)
- skill-detail.html (12.2 KB)
- recipes.html (19.5 KB)
- models.html (15.4 KB)
- security.html (12.7 KB)
- compare.html (14.6 KB)

### ⚠️ 需要手动导出（4 个）:
- homepage.html (0 bytes) ❌
- guides.html (0 bytes) ❌
- api-marketplace.html (0 bytes) ❌
- skills-library-v2.html (0 bytes) ❌

## 完成后

导出完成后，告诉我，我会继续进行下一步的集成工作。
