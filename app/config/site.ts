/** 站点文案与外链 — 更新一次即可全站同步 */
export const site = {
  name: '张卫钰',
  tagline: '用代码解决问题，折腾工具链',
  intro:
    'TypeScript · Golang · React · Vue · Node.js — 从 CLI 工具到 AI Agent，从 Monorepo 到边缘计算，享受把想法变成现实的乐趣。',
  email: 'zwillthink@163.com',
  location: '北京',
  siteUrl: 'https://will-introduce.vercel.app',
  /** 在此填入个人 GitHub 主页；留空则页脚不显示 GitHub（避免指向无关页面） */
  githubUrl: '',
} as const

export const navItems = [
  { href: '#skills', label: '技能' },
  { href: '#projects', label: '项目' },
  { href: '#capabilities', label: '能力' },
] as const
