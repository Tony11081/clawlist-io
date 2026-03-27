import rawSections from '@/data/claw123-directory.json'

type RawDirectoryItem = {
  id: string
  name: string
  sourceName: string
  url: string
  hostname: string
}

type RawDirectorySection = {
  key: string
  category: string
  sourceCategory: string
  summary: string
  items: RawDirectoryItem[]
}

export type Claw123DirectoryItem = RawDirectoryItem

export type Claw123DirectorySection = RawDirectorySection & {
  cardLabel: string
}

const nameOverrides: Record<string, string> = {
  'OpenClaw 官网': 'OpenClaw',
  官方GitHub: 'OpenClaw GitHub',
  '扣子Coze': 'Coze',
  'LobsterAI 有道龙虾': 'Youdao LobsterAI',
  悟空: 'Wukong',
  '360安全龙虾': '360 Secure Lobster',
  '阶跃桌面伙伴': 'Step Desktop Partner',
  '牛马 AI': 'Niuma AI',
  'Tabbit 浏览器': 'Tabbit Browser',
  PoorClaw穷虾: 'PoorClaw',
  阿里云: 'Alibaba Cloud',
  腾讯云: 'Tencent Cloud',
  火山引擎: 'Volcano Engine',
  百度智能云: 'Baidu AI Cloud',
  华为云: 'Huawei Cloud',
  京东云: 'JD Cloud',
  国家超算互联网: 'National Supercomputing Internet',
  天翼云: 'Tianyi Cloud',
  官方文档: 'Official Docs',
  'OpenClaw 橙皮书': 'OpenClaw Orange Book',
  '万象 AI 实验室​': 'Wanxiang AI Lab',
  'WaytoAGI 之路': 'WaytoAGI',
  非凡产研: 'Feifan Product Lab',
  'OpenClaw 中文学习手册': 'OpenClaw Chinese Learning Manual',
  'OpenClaw 从入门到精通': 'OpenClaw: Beginner to Advanced',
  'Hello Claw 教程': 'Hello Claw Tutorials',
  'Awesome 教程': 'Awesome Tutorials',
  飞书官方修炼指南: 'Feishu Official Guide',
  麻小玩虾指南: 'Mala Playbook',
  中文用例大全: 'Chinese Use Case Library',
  千问: 'Qwen',
  豆包: 'Doubao',
  豆包Doubao: 'Doubao',
  腾讯元宝: 'Tencent Yuanbao',
  即梦AI: 'Jimeng AI',
  '智谱 Coding Plan': 'Zhipu Coding Plan',
  '腾讯云 Coding Plan': 'Tencent Cloud Coding Plan',
  '阿里云Coding Plan': 'Alibaba Cloud Coding Plan',
  '火山引擎Coding Plan': 'Volcano Engine Coding Plan',
  '百度千帆Coding Plan': 'Baidu Qianfan Coding Plan',
  火山方舟: 'Volcano Ark',
  百度千帆: 'Baidu Qianfan',
  硅基流动: 'SiliconFlow',
  七牛云: 'Qiniu Cloud',
  讯飞星火: 'iFlytek Spark',
  快手万擎: 'Kuaishou Wanqing',
  智谱GLM: 'Zhipu GLM',
  千问Qwen: 'Qwen',
  腾讯混元: 'Tencent Hunyuan',
  百度文心: 'Baidu ERNIE',
  阶跃星辰: 'StepFun',
  虾评Skill: 'Xiaping Skill Reviews',
  SkillHub中国: 'SkillHub China',
  虾聊: 'Xialiao',
  曝光观察板: 'Exposure Dashboard',
  'Claw Bench 排行榜': 'Claw Bench Rankings',
  水产市场: 'Aquatic Market',
  'OpenClaw 使用案例': 'OpenClaw Use Cases',
  Reddit板块: 'Reddit Community',
  Discord官方服务器: 'Official Discord Server',
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

const sections = (rawSections as RawDirectorySection[]).map((section) => ({
  ...section,
  cardLabel: cardLabelMap[section.key] ?? 'Resource',
  items: section.items.map((item) => ({
    ...item,
    name: nameOverrides[item.sourceName] ?? item.name,
  })),
}))

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
