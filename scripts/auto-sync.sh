#!/bin/bash

# ClawList 自动同步脚本
# 持续从 braindump.md 同步内容到 ClawList，每次处理 5 条，间隔 30 秒

cd "$(dirname "$0")/.." || exit 1

echo "🚀 ClawList 自动同步启动"
echo "📍 工作目录: $(pwd)"
echo "📝 数据源: ~/clawd/memory/braindump.md"
echo "⏱️  每次处理 5 条，间隔 30 秒"
echo "🛑 按 Ctrl+C 停止"
echo ""

# 循环运行
ROUND=1
while true; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🔄 第 $ROUND 轮同步 - $(date '+%Y-%m-%d %H:%M:%S')"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # 运行同步脚本（每次处理 5 条）
  SYNC_LIMIT=5 node --env-file=.env.local scripts/sync-x-bookmarks.mjs

  EXIT_CODE=$?

  if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ 第 $ROUND 轮完成"
  else
    echo ""
    echo "⚠️  第 $ROUND 轮出错（退出码: $EXIT_CODE）"
  fi

  ROUND=$((ROUND + 1))

  echo ""
  echo "⏸️  等待 30 秒..."
  sleep 30
done
