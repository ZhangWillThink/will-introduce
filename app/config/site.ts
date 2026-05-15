/** 站点文案与外链 — 更新一次即可全站同步 */
export const site = {
  name: '张卫钰',
  tagline: '用代码解决问题，折腾工具链',
  intro: 'TypeScript · Golang · React · Vue · Node.js — 从 CLI 工具到 AI Agent，从 Monorepo 到边缘计算，享受把想法变成现实的乐趣。',
  email: 'zwillthink@163.com',
  location: '北京',
  siteUrl: 'https://will-introduce.vercel.app',
  /** 个人 GitHub 主页 */
  githubUrl: 'https://github.com/ZhangWillThink',
} as const

/** 项目均为闭源交付，仅作能力说明，不附公开链接 */
export const projects = [
  {
    name: 'rings-cli',
    label: 'CLI 工具',
    desc: '基于 LLM 驱动任务编排，实现算力资源统一调度与自动化执行的跨平台命令行工具',
    tags: ['Golang', 'LLM', 'PostgreSQL'],
  },
  {
    name: 'adtensor',
    label: '管理面板',
    desc: '从 0 到 1 搭建算力平台管理面板，多表单系统架构，算力可视化与任务管理',
    tags: ['React', 'Vite', 'Monorepo'],
  },
  {
    name: 'Lunana',
    label: 'AI 平台',
    desc: 'AI 驱动的内容平台，Agent 对话式业务操作，日报自动生成推送',
    tags: ['Monorepo', 'AI Agent', 'CI/CD'],
  },
  {
    name: 'metadesk',
    label: '工程体系',
    desc: '基于 Monorepo 构建统一工程体系，模块化架构与依赖管理，统一 Lint/构建/测试/发布规范',
    tags: ['pnpm workspace', '模块化', '工程规范'],
  },
  {
    name: 'Facebook 媒体平台',
    label: '边缘计算',
    desc: '基于 Cloudflare Workers / Pages / CDN 构建全球边缘加速方案，优化内容分发与接口性能',
    tags: ['Cloudflare', 'Workers', 'CDN'],
  },
] as const

export const navItems = [
  { href: '#skills', label: '技能' },
  { href: '#projects', label: '项目' },
  { href: '#capabilities', label: '能力' },
] as const
