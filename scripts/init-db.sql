-- 创建 skills 表
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  description TEXT,
  category TEXT,
  risk_level TEXT DEFAULT 'low',
  github_url TEXT,
  stars INTEGER DEFAULT 0,
  install_cmd TEXT,
  openclaw_version_range TEXT,
  permissions TEXT[],
  tags TEXT[],
  upvotes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 插入示例数据
INSERT INTO skills (name, slug, summary, description, category, risk_level, github_url, stars, install_cmd, openclaw_version_range, permissions, tags, upvotes) VALUES
('GitHub Issues', 'github-issues', '自动处理 GitHub Issues 并提交 PR', '监控 GitHub Issues，使用 AI 分析问题，生成修复代码，自动提交 Pull Request', '代码', 'low', 'https://github.com/openclaw/skills/gh-issues', 234, 'npx skills add gh-issues', '>=0.9.0', ARRAY['文件读写', '网络请求', 'Git 操作'], ARRAY['github', 'automation', 'pr'], 156),
('Browser Agent', 'browser-agent', '浏览器自动化测试和数据抓取', '使用 Playwright 进行浏览器自动化，支持测试、截图、数据抓取等功能', '自动化', 'medium', 'https://github.com/openclaw/skills/browser-agent', 189, 'npx skills add browser-agent', '>=0.9.0', ARRAY['浏览器控制', '网络请求'], ARRAY['browser', 'testing', 'scraping'], 89),
('Email Marketing', 'email-marketing', '自动化邮件营销和客户管理', '批量发送邮件、管理订阅者、跟踪打开率和点击率', '营销', 'low', 'https://github.com/openclaw/skills/email-marketing', 145, 'npx skills add email-marketing', '>=0.9.0', ARRAY['网络请求', '文件读取'], ARRAY['email', 'marketing', 'crm'], 67),
('Apple Notes', 'apple-notes', '管理 Apple Notes via CLI', '通过命令行创建、读取、搜索和管理 Apple Notes', '笔记', 'low', 'https://github.com/openclaw/skills/apple-notes', 98, 'npx skills add apple-notes', '>=0.9.0', ARRAY['文件读写'], ARRAY['notes', 'macos', 'productivity'], 45),
('WeChat Publisher', 'wechat-publisher', '自动发布内容到微信公众号', '通过 API 或浏览器自动化发布文章到微信公众号', '社媒', 'medium', 'https://github.com/openclaw/skills/wechat-publisher', 267, 'npx skills add wechat-publisher', '>=0.9.0', ARRAY['浏览器控制', '网络请求'], ARRAY['wechat', 'publishing', 'social'], 123),
('Image Generator', 'image-gen', 'AI 图片生成与编辑', '使用 DALL-E、Midjourney 等 AI 模型生成和编辑图片', '创作', 'low', 'https://github.com/openclaw/skills/image-gen', 456, 'npx skills add image-gen', '>=0.9.0', ARRAY['网络请求'], ARRAY['ai', 'image', 'generation'], 234),
('Data Scraper', 'data-scraper', '通用数据抓取工具', '从网站抓取结构化数据，支持 CSS 选择器和 XPath', '数据', 'medium', 'https://github.com/openclaw/skills/data-scraper', 312, 'npx skills add data-scraper', '>=0.9.0', ARRAY['网络请求', '浏览器控制'], ARRAY['scraping', 'data', 'automation'], 178),
('Slack Bot', 'slack-bot', 'Slack 机器人集成', '在 Slack 中接收消息、发送通知、执行命令', '通讯', 'low', 'https://github.com/openclaw/skills/slack-bot', 201, 'npx skills add slack-bot', '>=0.9.0', ARRAY['网络请求'], ARRAY['slack', 'bot', 'communication'], 92),
('PDF Generator', 'pdf-gen', '生成和编辑 PDF 文档', '从 HTML、Markdown 或模板生成 PDF，支持水印、加密等', '文档', 'low', 'https://github.com/openclaw/skills/pdf-gen', 167, 'npx skills add pdf-gen', '>=0.9.0', ARRAY['文件读写'], ARRAY['pdf', 'document', 'generation'], 81),
('Calendar Sync', 'calendar-sync', '日历同步和管理', '同步 Google Calendar、Outlook 等日历，自动创建事件', '日程', 'low', 'https://github.com/openclaw/skills/calendar-sync', 134, 'npx skills add calendar-sync', '>=0.9.0', ARRAY['网络请求'], ARRAY['calendar', 'sync', 'productivity'], 56);
