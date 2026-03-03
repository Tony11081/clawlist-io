#!/bin/bash
# 下载所有保留的 Stitch HTML 代码

set -e

HTML_DIR="/Users/chengyadong/clawd/projects/clawlist-app/stitch/html"
mkdir -p "$HTML_DIR"

echo "📥 开始下载 HTML 代码..."
echo ""

# Homepage
echo "1/11 下载 Homepage..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzU3Zjk1M2Q5NWY2ZTQwOTliZTY0MTgxYmZmNGM5MDhjEgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/homepage.html"

# Skills Library
echo "2/11 下载 Skills Library..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzA0MzRjNmZmYWM5YTQwYTlhMjgxMGE4ZmEzYjgyZTcwEgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/skills-library.html"

# Skills Library Empty State
echo "3/11 下载 Skills Library Empty State..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzkwNDQxOGYzYjdlOTQ1NGRhNmE1N2UxNGJhMzNkYmEyEgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/skills-library-empty.html"

# Skill Detail
echo "4/11 下载 Skill Detail..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzllYTM4MTk2ZjRjYjRkMGE4OTJjMDg4MzBkOTBiM2JlEgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/skill-detail.html"

# Guides
echo "5/11 下载 Guides..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzhjZGQ5ZWUyNzU4ZTRjNTg4N2VlNDNkZDQ3OWRmYmQ1EgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/guides.html"

# Recipes
echo "6/11 下载 Recipes..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzI3ZTQ5YWNmNTdkYTQ1NzZhMzU3ZWMyOWEyNDdhNWMxEgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/recipes.html"

# Models
echo "7/11 下载 Models..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzU5M2JmYWI0YWFkZjQ4YmFhMGE5OTU1ZmUzNmE5M2FkEgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/models.html"

# API Marketplace
echo "8/11 下载 API Marketplace..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sX2NkMWRlZTIwNjJkYjQzMjNiNjgyNGQ0OGY1YzJhYThiEgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/api-marketplace.html"

# Security
echo "9/11 下载 Security..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzcyMGUzOTM4MWQ1MDRjMGZiNWQyMzA4OWFiY2M0MWUwEgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/security.html"

# Compare
echo "10/11 下载 Compare..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sX2ExZDhhNjgzNzcwODQwYWNiZWU1MjQ2NGE1NmU4MjAwEgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/compare.html"

# Skills Library Variant 2 (另一个变体)
echo "11/11 下载 Skills Library Variant 2..."
curl -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzhlZjY2MDQ2ZTA0NTRmYTJhNGNhNTAyNTEzZjgxYWFjEgsSBxDwgva6ih8YAZIBIgoKcHJvamVjdF9pZBIUQhIzNjg0ODU4MzY2MDIzODkxNzI&filename=&opi=96797242" -o "$HTML_DIR/skills-library-v2.html"

echo ""
echo "✅ 所有 HTML 文件已下载完成！"
echo "📁 文件位置: $HTML_DIR"
echo ""
ls -lh "$HTML_DIR"
