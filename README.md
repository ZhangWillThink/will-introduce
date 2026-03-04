# 个人简介作品集网站

一个现代、专业的前端开发者个人简介与作品集网站，采用 React + GSAP 动画构建，展示开发技能、项目经历和 AI 功能应用。

## 📋 项目概述

本项目用于展示前端工程师的专业形象，包括：

- **技能展示** - React、Vue、Node.js、GSAP 动画、AI 相关功能开发
- **项目展示** - 企业/公司官网、AI 视频素材库智能检索系统
- **个人品牌** - 专业、现代、有技术感的设计风格

## 🚀 技术栈

| 类别     | 技术                         |
| -------- | ---------------------------- |
| 前端框架 | React + TypeScript           |
| 动画库   | GSAP (GreenSock)             |
| 构建工具 | Next.js                      |
| 样式     | Tailwind CSS                 |
| 包管理   | pnpm                         |

## 📁 项目结构

```
src/
├── components/       # 通用组件
├── sections/         # 页面各区块 (Hero、About、Projects、Skills、Contact)
├── hooks/            # 自定义 Hook
├── animations/       # GSAP 动画逻辑封装
├── assets/           # 图片、字体等静态资源
└── utils/            # 工具函数
```

## 🏁 快速开始

### 环境要求

- Node.js 16+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 📖 页面内容

1. **Hero 区块** - 首屏展示，包含姓名、职位、一句话介绍，配合 GSAP 入场动画
2. **About 区块** - 个人背景、开发理念、性格特点
3. **Skills 区块** - 核心技能展示 (React、Vue、Node.js、GSAP、AI 功能)
4. **Projects 区块** - 重点项目展示
   - 企业官网 (使用 GSAP 实现高质量动画)
   - AI 视频素材库检索系统 (语义搜索、向量检索)
5. **Contact 区块** - 联系方式 (邮箱、GitHub、社交媒体)

## 🎨 设计规范

- **风格** - 现代、简洁、有技术感
- **配色** - 深色系为主，辅以亮色强调色
- **响应式** - 移动优先 (Mobile First)
- **动画** - 流畅自然，突出专业感

## 🔧 开发规范

- 优先使用 **TypeScript** 保证类型安全
- 采用**函数式组件 + Hooks** 风格
- 动画逻辑集中在 `src/animations/` 目录
- 使用 `useGSAP` Hook 管理动画生命周期
- AI 功能接口不在前端硬编码密钥，由后端代理

## 📝 许可证

MIT
