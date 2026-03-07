/**
 * 从 Markdown 内容中提取第一张图片 URL
 */
export function extractFirstImage(markdown: string): string | null {
  if (!markdown) return null

  // 匹配 Markdown 图片语法: ![alt](url)
  const mdImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/
  const mdMatch = markdown.match(mdImageRegex)
  if (mdMatch && mdMatch[2]) {
    return mdMatch[2]
  }

  // 匹配 HTML img 标签: <img src="url"
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/
  const htmlMatch = markdown.match(htmlImageRegex)
  if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1]
  }

  return null
}
