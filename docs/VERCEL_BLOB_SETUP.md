# Vercel Blob Storage 配置指南

## 1. 在 Vercel Dashboard 中启用 Blob Storage

1. 访问 https://vercel.com/dashboard
2. 选择 `clawlist-app` 项目
3. 进入 **Storage** 标签
4. 点击 **Create Database**
5. 选择 **Blob**
6. 点击 **Create**

Vercel 会自动添加以下环境变量：
- `BLOB_READ_WRITE_TOKEN`

## 2. 验证配置

部署完成后，访问：
```
https://clawlist.io/api/upload-image
```

应该返回 405 Method Not Allowed（因为需要 POST 请求）

## 3. 使用新脚本上传博客配图

```bash
cd ~/clawd/projects/clawlist-app
node scripts/add-blog-cover-image-blob.mjs <blog-slug>
```

例如：
```bash
node scripts/add-blog-cover-image-blob.mjs openclaw-9-layer-system-prompt-architecture
```

## 4. 工作流程

1. **生成图片**：使用 nbnb-image-gen 生成图片到 /tmp
2. **上传到 Vercel Blob**：通过 API 上传，获得永久 URL
3. **更新博客内容**：在 Supabase 中添加图片 URL
4. **立即生效**：无需重新部署！

## 5. 优势

✅ **无需重新部署**：图片上传后立即可用
✅ **自动 CDN**：Vercel 自动提供全球 CDN 加速
✅ **免费额度充足**：1GB 存储 + 100GB 带宽/月
✅ **简单易用**：一个 API 调用搞定

## 6. 迁移现有图片

将现有的本地图片迁移到 Vercel Blob：

```bash
# 上传现有图片
curl -X POST https://clawlist.io/api/upload-image \
  -F "file=@public/blog-images/openclaw-9-layer-architecture.png"
```

然后更新博客内容中的图片 URL。

## 7. 故障排除

### 上传失败

如果上传失败，检查：
1. Vercel Blob 是否已启用
2. 环境变量是否正确配置
3. 图片大小是否超过限制（最大 4.5MB）

### 图片无法访问

如果图片无法访问：
1. 检查 Blob URL 是否正确
2. 确认 access 设置为 'public'
3. 查看 Vercel 部署日志

## 8. 成本估算

**免费额度**：
- 存储：1 GB
- 带宽：100 GB/月

**假设**：
- 每张图片 500KB
- 每篇博客 1 张图片
- 每篇博客 1000 次浏览/月

**可支持**：
- 存储：2000 张图片
- 流量：200,000 次图片加载/月

对于博客来说完全够用！

## 9. 下一步

- [ ] 在 Vercel Dashboard 启用 Blob Storage
- [ ] 测试上传 API
- [ ] 迁移现有图片
- [ ] 更新文档

---

**更新时间**：2026-03-06
**状态**：待配置
