# Vercel 部署故障排查指南

## 常见问题和解决方案

### 1. 环境变量缺失

**问题**: 构建时找不到环境变量

**解决方案**: 在 Vercel 仪表板中添加环境变量

1. 访问 https://vercel.com/dashboard
2. 选择项目 `clawlist-app`
3. 进入 Settings → Environment Variables
4. 添加以下变量：

```
NEXT_PUBLIC_SUPABASE_URL=https://ygnbikloljpjzkxxcoar.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmJpa2xvbGpwanpreHhjb2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0OTkwOTUsImV4cCI6MjA4ODA3NTA5NX0._6o9uZMuOK3HvMksWQ7z2zyOi6KrNBJ94pnoQkQ_SPA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmJpa2xvbGpwanpreHhjb2FyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ5OTA5NSwiZXhwIjoyMDg4MDc1MDk1fQ.h6X6UBVjEQjzs0kmJea-xwfOWvCxsbtUkihlAbb2r60
```

### 2. 构建超时

**问题**: 构建时间超过限制

**解决方案**:
- 检查是否有大文件或依赖
- 优化构建配置
- 升级 Vercel 计划（如果需要）

### 3. Next.js 配置问题

**问题**: `output: 'standalone'` 可能导致问题

**解决方案**: 移除或调整 next.config.ts

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除 output: 'standalone' 用于 Vercel 部署
};

export default nextConfig;
```

### 4. 依赖安装失败

**问题**: npm install 失败

**解决方案**:
```bash
# 清理并重新安装
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 5. TypeScript 错误

**问题**: 构建时 TypeScript 类型检查失败

**解决方案**: 本地运行检查
```bash
npm run build
# 如果本地成功，推送到 GitHub 触发重新部署
```

## 部署步骤

### 方法 1: 通过 GitHub 自动部署（推荐）

1. 确保代码已推送到 GitHub
```bash
git push origin main
```

2. Vercel 会自动检测并部署

### 方法 2: 使用 Vercel CLI

```bash
# 登录 Vercel
vercel login

# 部署到生产环境
vercel --prod
```

## 检查部署状态

### 在 Vercel 仪表板
1. 访问 https://vercel.com/dashboard
2. 查看最新部署状态
3. 点击部署查看详细日志

### 使用 CLI
```bash
vercel ls
vercel logs [deployment-url]
```

## 常见错误信息

### Error: Module not found
**原因**: 依赖缺失或路径错误
**解决**: 检查 import 路径，确保所有依赖在 package.json 中

### Error: Environment variable not found
**原因**: 环境变量未配置
**解决**: 在 Vercel 仪表板添加环境变量

### Error: Build exceeded maximum duration
**原因**: 构建时间过长
**解决**: 优化构建或升级计划

## 验证部署

部署成功后，访问以下页面确认：

- https://clawlist-app.vercel.app/
- https://clawlist-app.vercel.app/guides
- https://clawlist-app.vercel.app/skills
- https://clawlist-app.vercel.app/api-marketplace
- https://clawlist-app.vercel.app/recipes
- https://clawlist-app.vercel.app/security

## 回滚部署

如果新部署有问题：

1. 在 Vercel 仪表板找到之前的成功部署
2. 点击 "Promote to Production"
3. 或使用 CLI: `vercel rollback`

## 性能优化建议

1. **启用 Edge Functions** (如果适用)
2. **配置 CDN 缓存**
3. **启用图片优化**
4. **使用 ISR (Incremental Static Regeneration)**

## 需要帮助？

如果问题仍然存在，请提供：
1. Vercel 部署日志截图
2. 错误信息
3. 部署 URL

然后我可以进一步诊断问题。
