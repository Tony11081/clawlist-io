import rawSections from '@/data/claw123-directory.json'

type RawDirectoryItem = {
  id: string
  name: string
  url: string
  hostname: string
}

type RawDirectorySection = {
  key: string
  category: string
  summary: string
  items: RawDirectoryItem[]
}

export type Claw123DirectoryItem = {
  id: string
  name: string
  url: string
  hostname: string
}

export type Claw123DirectorySection = {
  key: string
  category: string
  summary: string
  items: Claw123DirectoryItem[]
  cardLabel: string
}

const nameOverrides: Record<string, string> = {
  'OpenClaw official website': 'OpenClaw',
  'Official GitHub': 'OpenClaw GitHub',
  'Button Coze': 'Coze',
  'LobsterAI Youdao Lobster': 'Youdao LobsterAI',
  '360 safe lobster': '360 Secure Lobster',
  'Tabbit browser': 'Tabbit Browser',
  'Official documentation': 'Official Docs',
  'OpenClaw Chinese Learning Manual': 'OpenClaw Learning Manual',
  'OpenClaw from Beginner to Master': 'OpenClaw: Beginner to Advanced',
  'Hello Claw Tutorial': 'Hello Claw Tutorials',
  'Awesome Tutorial': 'Awesome Tutorials',
  'Mala Playbook to Play Shrimp': 'Mala Playbook',
  'Complete Collection of Chinese Use Cases': 'Chinese Use Case Library',
  'bean bag': 'Doubao',
  'Dream AI': 'Jimeng AI',
  'Coding Plan': 'Zhipu Coding Plan',
  'volcano engine': 'Volcano Engine',
  'silicon based flow': 'SiliconFlow',
  'iFlytek Spark': 'iFlytek Spark',
  GLM: 'Zhipu GLM',
  'shrimp chat': 'Xialiao',
  'Exposure observation board': 'Exposure Dashboard',
  'fish market': 'Aquatic Market',
  'OpenClaw use cases': 'OpenClaw Use Cases',
  'Reddit section': 'Reddit Community',
  'Discord official server': 'Official Discord Server',
}

const cardLabelMap: Record<string, string> = {
  'openclaw-landscape': 'OpenClaw Surface',
  'cloud-deployment': 'Deployment Option',
  'tutorial-collections': 'Guide Library',
  'popular-ai-tools': 'AI Tool',
  'coding-plans': 'Coding Plan',
  'maas-platforms': 'Model Platform',
  'ai-models': 'Model Family',
  'skills-marketplaces': 'Skill Hub',
  'broader-ecosystem': 'Ecosystem Tool',
  'agent-ecosystem': 'Agent Product',
  'agent-payments': 'Payment Layer',
  'crypto-ecosystem': 'Crypto Product',
}

const sections = (rawSections as RawDirectorySection[]).map((section) => {
  const items = section.items.map((item) => ({
    id: item.id,
    name: nameOverrides[item.name] ?? item.name,
    url: item.url,
    hostname: item.hostname,
  }))

  return {
    key: section.key,
    category: section.category,
    summary: section.summary,
    items,
    cardLabel: cardLabelMap[section.key] ?? 'Resource',
  }
})

export const claw123DirectorySections: Claw123DirectorySection[] = sections

export function getClaw123DirectoryStats() {
  return {
    totalCategories: sections.length,
    totalResources: sections.reduce((sum, section) => sum + section.items.length, 0),
  }
}

export function getFeaturedClaw123Sections(limit = 4) {
  return [...sections]
    .sort((left, right) => right.items.length - left.items.length)
    .slice(0, limit)
}
