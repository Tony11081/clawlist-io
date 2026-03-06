# Union Search - Unified Multi-Platform Search Solution

> 🚀 One command to reach 30+ platforms — GitHub, Twitter, Bilibili, Xiaohongshu, Douyin, and more

## Overview

Union Search is a production-ready CLI tool that breaks down platform silos and gives you unified access to 30+ search platforms with a single command. No more switching between tabs, no more repetitive searches, no more manual data scraping.

## Why Union Search?

| Feature | Union Search | Other Tools |
|---------|--------------|-------------|
| Platform Coverage | **30+** | Usually 1-5 |
| Fallback Channels | **✅ Multi-channel redundancy** | ❌ Single channel |
| Unified CLI | **✅ Standardized interface** | ❌ Fragmented |
| Image Search | **✅ 18 platforms** | ❌ Rare |
| Chinese Social Media | **✅ Douyin/Xiaohongshu/Bilibili** | ❌ Mostly Western-focused |

## Supported Platforms

### Developer Communities
- **GitHub** - Repositories, code, issues, PRs
- **Reddit** - Posts, subreddits, users
- **Zhihu** - Q&A search

### Social Media & Video
- **Xiaohongshu (小红书)** - Notes and posts
- **Douyin (抖音)** - Video search
- **Bilibili** - Videos and creators
- **Twitter/X** - Tweet search
- **YouTube** - Videos and comments
- **Weibo** - Microblog search

### Search Engines
- **Google, Bing, DuckDuckGo, Brave, Yahoo, Baidu, Yandex**

### AI-Powered Search
- **Tavily** - AI summaries and smart search
- **Metaso (秘塔)** - AI-generated answers
- **Volcengine (火山)** - Hybrid search + AI summaries
- **Jina** - Content extraction

### Image Search (18 Platforms)
- Search engines: Baidu, Bing, Google, 360, Sogou, DuckDuckGo, Yandex, Yahoo
- Stock photos: Pixabay, Pexels, Unsplash, Foodiesfeed
- Anime: Danbooru, Gelbooru, Safebooru
- Others: Huaban, Ciyuan, Volcengine

### Content Subscriptions
- **RSS** - Multi-source aggregation with keyword filtering
- **Xiaoyuzhou FM** - Podcast search with AI summaries

## Key Features

### 🌐 Unified Interface
Single CLI command for all platforms with standardized output format (JSON/Markdown/Text).

### 🔄 Automatic Fallback
Multi-channel redundancy design — when primary channel fails, automatically switches to backup.

### ⚡ Concurrent Search
Configurable parallel execution with rate limiting and timeout control.

### 📊 Search Logging
Automatic logging of all search requests and results to `search_logs/` directory.

### 🎯 Platform Grouping
Pre-configured groups for common use cases:
- `dev` - GitHub, Reddit, Zhihu
- `social` - Xiaohongshu, Douyin, Twitter, Weibo
- `video` - Bilibili, YouTube
- `search` - Google, Bing, DuckDuckGo, Brave, Yahoo
- `ai` - Tavily, Metaso, Volcengine, Jina

### 🛡️ Production Ready
Complete error handling, rate limiting, health checks, and environment validation.

## Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/runningZ1/union-search-skill
cd union-search-skill

# Install dependencies
pip install requests python-dotenv lxml

# Optional: Image search
pip install pyimagedl

# Optional: Bilibili search
pip install curl_cffi

# Optional: Tavily search
pip install tavily-python

# Optional: RSS search
pip install feedparser
```

### Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your API keys (optional)
```

### First Search

```bash
# Multi-platform search (developer group)
python union_search_cli.py search "AI Agent" --group dev --limit 3 --pretty

# Single platform search
python union_search_cli.py google "Python tutorial" --limit 5

# Image search and download
python union_search_cli.py image "cute cats" --platforms google bing pixabay --limit 20 --output-dir ./images
```

## Usage Examples

### Multi-Platform Aggregated Search

```bash
# Search developer content
python union_search_cli.py search "machine learning" --group dev --limit 5

# Search social media
python union_search_cli.py search "AI trends" --group social --limit 3

# Specify multiple platforms
python union_search_cli.py search "Python" --platforms github google tavily --limit 5

# With concurrency and timeout control
python union_search_cli.py search "Rust" --max-workers 10 --timeout 120
```

### Single Platform Search

```bash
# GitHub search
python union_search_cli.py platform github "awesome python" --limit 10

# Or use direct command
python union_search_cli.py github "machine learning" --limit 5
python union_search_cli.py bing "AI news" --limit 10
```

### Image Search & Download

```bash
# Search and download images
python union_search_cli.py image "cute cats" \
  --platforms google bing pixabay \
  --limit 20 \
  --output-dir ./cat_images

# Custom download threads
python union_search_cli.py image "landscape" --threads 10 --limit 50
```

### List Capabilities

```bash
# List all platforms and groups
python union_search_cli.py list --format markdown

# Only image platforms
python union_search_cli.py list --type images
```

### Health Check

```bash
# Check environment configuration
python union_search_cli.py doctor --env-file .env

# Strict mode (warnings return non-zero)
python union_search_cli.py doctor --strict
```

## Real-World Performance

> Based on actual search test (2026-03-05), keyword: `AI agent`

### Search Engine Group Results

| Platform | Results | Response Time | Status |
|----------|---------|---------------|--------|
| metaso | 10 | 1.00s | ✅ |
| baidu | 10 | 1.60s | ✅ |
| yandex | 10 | 2.15s | ✅ |
| bing | 3 | 2.22s | ✅ |
| wikipedia | 10 | 2.34s | ✅ |
| google | 10 | 2.95s | ✅ |
| tavily | 5 | 3.19s | ✅ |
| brave | 10 | 3.20s | ✅ |
| duckduckgo | 6 | 3.58s | ✅ |
| jina | 10 | 3.68s | ✅ |
| yahoo | 7 | 2.62s | ✅ |
| volcengine | 10 | 6.45s | ✅ |

### Summary Statistics

- **Platforms**: 12
- **Success Rate**: 12/12 (100%)
- **Total Time**: 11.14 seconds
- **Total Results**: 91 items
- **Average per Platform**: 7.6 items
- **Fastest Response**: metaso (1.00s)
- **Estimated Unique Results**: ~65-70 (after deduplication)

## API Keys & Costs

| Service | Cost | Notes |
|---------|------|-------|
| **SerpAPI** | Free 250/month | Requires phone verification |
| **TikHub** | $5 ≈ 5000 calls | For Xiaohongshu/Douyin/Twitter |
| **Tavily** | Free 1000 credits/month | AI search |
| **DuckDuckGo/Brave/Yahoo** | Free | No API key needed |

💡 **Tip**: Prioritize free platforms for daily use, configure multiple channels for production with automatic fallback.

## Use Cases

### 1. Cross-Platform Content Discovery
Monitor trending topics across GitHub, Twitter, Reddit, and Chinese social media simultaneously.

### 2. Competitive Intelligence
Track competitor mentions, product launches, and market trends across multiple platforms.

### 3. Research Automation
Aggregate academic papers, technical discussions, and community insights from diverse sources.

### 4. Social Media Listening
Monitor brand mentions, sentiment, and engagement across Western and Chinese platforms.

### 5. Developer Community Tracking
Track open-source projects, technical discussions, and community engagement.

## Integration with OpenClaw

Union Search integrates seamlessly with OpenClaw, giving your AI assistant the ability to search across 30+ platforms with natural language commands.

### Example Workflow

```
User: "Search GitHub for the most starred CLI tools this month"
OpenClaw + Union Search: Executes search, aggregates results, presents formatted list
```

### Benefits

- **No context switching** - Stay in your OpenClaw workflow
- **Unified results** - Consistent format across all platforms
- **Intelligent automation** - Let AI decide which platforms to search
- **Extensible** - Add custom search logic and filters

## Roadmap

### Coming Soon

| Feature | Description | Status |
|---------|-------------|--------|
| **Full Media Download** | Download videos from Douyin, Xiaohongshu, Bilibili, YouTube | 🔄 In Progress |
| **More Search Channels** | Wikipedia mirrors, Google Scholar, Semantic Scholar | 📝 Planned |
| **Auto Channel Switching** | Seamless fallback when primary channel fails | 📝 Planned |
| **Result Caching** | Reduce duplicate requests, save API quota | 📝 Planned |

## Troubleshooting

### Common Issues

#### 1. Platform Returns 403 Error

**Cause**: Invalid API key or rate limit exceeded

**Solution**:
```bash
# Check API key configuration
python union_search_cli.py doctor --platforms github google

# Reduce concurrency
python union_search_cli.py search "query" --max-workers 2
```

#### 2. Image Download Fails

**Cause**: Missing `pyimagedl` dependency

**Solution**:
```bash
pip install pyimagedl
```

#### 3. Volcengine Parsing Error

**Status**: Known issue, fix in progress

**Workaround**: Use alternative AI search platforms
```bash
python union_search_cli.py search "query" --platforms tavily metaso
```

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - see [LICENSE](https://github.com/runningZ1/union-search-skill/blob/main/LICENSE) for details.

## Links

- **GitHub**: https://github.com/runningZ1/union-search-skill
- **Author**: [@runningZ1](https://github.com/runningZ1)
- **Category**: Productivity
- **Tags**: search, automation, multi-platform, cli, python

---

**The future of AI assistants should be like electricity: ubiquitous, on-demand, and breaking through tool boundaries.**

If you're still writing complex automation scripts, repeatedly searching web pages, and wasting time manually scraping data — this is your game-changer. ⚡
