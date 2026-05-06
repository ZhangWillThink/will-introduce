/**
 * 站内叙事单一来源：首屏引言与身份信息只在此维护，
 * 其它区块只做延伸（技能条、项目、联系方式等），避免长段复述。
 */
export const siteIdentity = {
  /** 顶部 eyebrow */
  locationLine: "Beijing Chaoyang / Available now",
  /** <h1> 展示名 */
  displayName: "张卫钰 Will Zhang",
  /** 职位短语（可用于 metadata / whoami 等短输出） */
  roleShort: "高级全栈工程师",
  /** 首屏主标语（一句话），与下方 introBlurb 分工、不与技能区逐条重复 */
  tagline: "擅长把 AI 能力、前端体验和工程体系组合成可交付的产品系统。",
  /**
   * 首屏补充段落：经历与领域，不含具体技术栈条目（技术栈只在 Capabilities）。
   */
  introBlurb:
    "熟练掌握 React、Vue、Next.js、Nuxt.js 与 Node.js / Bun，深耕 AI Agent、Monorepo 工程化与前后端一体化交付；曾主导算力调度 CLI、多媒体平台等产品从选型、架构到持续上线的完整链路。",
  email: "zwillthink@163.com",
  githubUrl: "https://github.com/ZhangWillThink",
} as const;
