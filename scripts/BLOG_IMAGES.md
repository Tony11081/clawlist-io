# Blog Cover Image Generator

自动为 ClawList 博客文章生成配图，使用 `nbnb-image-gen` skill。

## 使用方法

### 为单篇文章添加配图

```bash
cd ~/clawd/projects/clawlist-app
node scripts/add-blog-cover-image.mjs <blog-slug>
```

例如：
```bash
node scripts/add-blog-cover-image.mjs openclaw-9-layer-system-prompt-architecture
```

### 工作流程

1. 脚本会自动：
   - 从数据库获取博客文章
   - 根据标题、标签和摘要生成合适的图片提示词
   - 使用 `nbnb-image-gen` 生成 16:9 的配图
   - 将图片保存到 `public/blog-images/`
   - 在文章开头添加图片引用

2. 提交到 Git：
   ```bash
   git add public/blog-images/
   git commit -m "Add cover image for blog post"
   git push origin main
   ```

3. Vercel 会自动部署，图片即可在网站上显示

## 图片风格

脚本会根据文章标签自动选择合适的风格：

- **AI/AI Agents**: 现代 AI 主题插图，神经网络图案
- **Automation**: 简洁的自动化工作流程图
- **Architecture**: 技术架构图，包含层次和组件
- **Social Media/Twitter**: 社交媒体主题插图
- **默认**: 专业技术图表

## 图片规格

- 分辨率: 2048x2048
- 宽高比: 16:9
- 格式: PNG
- 位置: `public/blog-images/<blog-slug>.png`

## 手动生成图片

如果需要更精确的控制，可以直接使用 `nbnb-image-gen`：

```bash
node ~/clawd/skills/nbnb-image-gen/generate.js \
  --prompt "Your custom prompt here" \
  --out ~/clawd/projects/clawlist-app/public/blog-images/my-image.png \
  --resolution 2048x2048 \
  --aspect-ratio 16:9
```

然后手动更新博客内容，在开头添加：
```markdown
![Image Title](/blog-images/my-image.png)
```

## 注意事项

- 图片会自动添加到文章开头
- 如果文章已有图片，脚本会跳过更新（但仍会生成新图片）
- 图片文件名与博客 slug 相同
- 所有图片使用 16:9 宽高比，适合博客横幅展示
