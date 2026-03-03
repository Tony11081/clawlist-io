#!/usr/bin/env node

// Seed skills data to Supabase
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const skills = [
  {
    name: 'GitHub Issues',
    slug: 'github-issues',
    summary: 'Auto-handle GitHub issues and submit PRs',
    description: 'Automatically fetch, analyze, and fix GitHub issues. Creates PRs with fixes and monitors review comments.',
    tags: ['code', 'automation', 'github'],
    category: 'Development',
    risk_level: 'low',
    install_cmd: 'npx skills add gh-issues',
    upvotes: 245,
    status: 'published'
  },
  {
    name: 'Browser Agent',
    slug: 'browser-agent',
    summary: 'Browser automation for testing and scraping',
    description: 'Automate web interactions, fill forms, take screenshots, and extract data from websites.',
    tags: ['automation', 'testing', 'scraping'],
    category: 'Automation',
    risk_level: 'medium',
    install_cmd: 'npx skills add agent-browser',
    upvotes: 189,
    status: 'published'
  },
  {
    name: 'Email Marketing',
    slug: 'email-marketing',
    summary: 'Automated email campaigns and CRM',
    description: 'Send personalized email campaigns, track opens/clicks, and manage customer relationships.',
    tags: ['marketing', 'email', 'crm'],
    category: 'Marketing',
    risk_level: 'low',
    install_cmd: 'npx skills add email-marketing',
    upvotes: 156,
    status: 'published'
  },
  {
    name: 'X/Twitter Bot',
    slug: 'x-twitter-bot',
    summary: 'Post, reply, and monitor X/Twitter',
    description: 'Automate X/Twitter interactions: post tweets, reply to mentions, search content, and analyze trends.',
    tags: ['social', 'twitter', 'automation'],
    category: 'Social Media',
    risk_level: 'medium',
    install_cmd: 'npx skills add xurl',
    upvotes: 203,
    status: 'published'
  },
  {
    name: 'WhatsApp Business',
    slug: 'whatsapp-business',
    summary: 'WhatsApp customer service automation',
    description: 'Handle WhatsApp customer inquiries, send automated responses, and manage conversations.',
    tags: ['messaging', 'customer-service', 'automation'],
    category: 'Customer Service',
    risk_level: 'medium',
    install_cmd: 'npx skills add wacli',
    upvotes: 178,
    status: 'published'
  },
  {
    name: 'Notion Integration',
    slug: 'notion-integration',
    summary: 'Sync and manage Notion databases',
    description: 'Create, update, and query Notion pages and databases. Perfect for knowledge management.',
    tags: ['productivity', 'notion', 'database'],
    category: 'Productivity',
    risk_level: 'low',
    install_cmd: 'npx skills add notion',
    upvotes: 167,
    status: 'published'
  },
  {
    name: 'Slack Bot',
    slug: 'slack-bot',
    summary: 'Slack workspace automation',
    description: 'Send messages, create channels, manage users, and automate Slack workflows.',
    tags: ['messaging', 'slack', 'team'],
    category: 'Team Collaboration',
    risk_level: 'low',
    install_cmd: 'npx skills add slack',
    upvotes: 145,
    status: 'published'
  },
  {
    name: 'Google Calendar',
    slug: 'google-calendar',
    summary: 'Calendar management and scheduling',
    description: 'Create events, check availability, send invites, and manage Google Calendar.',
    tags: ['productivity', 'calendar', 'google'],
    category: 'Productivity',
    risk_level: 'low',
    install_cmd: 'npx skills add gog',
    upvotes: 134,
    status: 'published'
  },
  {
    name: 'Image Generation',
    slug: 'image-generation',
    summary: 'AI-powered image creation',
    description: 'Generate images from text descriptions using DALL-E, Midjourney, or Stable Diffusion.',
    tags: ['ai', 'image', 'creative'],
    category: 'Creative',
    risk_level: 'low',
    install_cmd: 'npx skills add baoyu-image-gen',
    upvotes: 298,
    status: 'published'
  },
  {
    name: 'PDF Tools',
    slug: 'pdf-tools',
    summary: 'PDF manipulation and extraction',
    description: 'Edit PDFs with natural language, extract text, merge/split files, and convert formats.',
    tags: ['document', 'pdf', 'utility'],
    category: 'Utilities',
    risk_level: 'low',
    install_cmd: 'npx skills add nano-pdf',
    upvotes: 112,
    status: 'published'
  },
  // Add 40 more skills...
  {
    name: 'Video Transcription',
    slug: 'video-transcription',
    summary: 'Convert video/audio to text',
    description: 'Transcribe YouTube videos, podcasts, and local audio files using Whisper AI.',
    tags: ['ai', 'transcription', 'video'],
    category: 'Media',
    risk_level: 'low',
    install_cmd: 'npx skills add openai-whisper',
    upvotes: 187,
    status: 'published'
  },
  {
    name: 'SEO Analyzer',
    slug: 'seo-analyzer',
    summary: 'Website SEO audit and optimization',
    description: 'Analyze website SEO, check meta tags, find broken links, and suggest improvements.',
    tags: ['seo', 'marketing', 'web'],
    category: 'Marketing',
    risk_level: 'low',
    install_cmd: 'npx skills add seo-analyzer',
    upvotes: 143,
    status: 'published'
  },
  {
    name: 'Database Backup',
    slug: 'database-backup',
    summary: 'Automated database backups',
    description: 'Schedule and manage backups for PostgreSQL, MySQL, MongoDB, and more.',
    tags: ['database', 'backup', 'devops'],
    category: 'DevOps',
    risk_level: 'low',
    install_cmd: 'npx skills add db-backup',
    upvotes: 98,
    status: 'published'
  },
  {
    name: 'Code Review',
    slug: 'code-review',
    summary: 'AI-powered code review',
    description: 'Automatically review pull requests, suggest improvements, and catch bugs.',
    tags: ['code', 'review', 'ai'],
    category: 'Development',
    risk_level: 'low',
    install_cmd: 'npx skills add code-review',
    upvotes: 221,
    status: 'published'
  },
  {
    name: 'Telegram Bot',
    slug: 'telegram-bot',
    summary: 'Telegram bot automation',
    description: 'Create and manage Telegram bots, send messages, handle commands, and more.',
    tags: ['messaging', 'telegram', 'bot'],
    category: 'Messaging',
    risk_level: 'low',
    install_cmd: 'npx skills add telegram',
    upvotes: 176,
    status: 'published'
  },
];

async function seedSkills() {
  console.log(`🌱 Seeding ${skills.length} skills...`);
  
  const { data, error } = await supabase
    .from('skills')
    .upsert(skills, { onConflict: 'slug' });

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${skills.length} skills`);
}

seedSkills();
