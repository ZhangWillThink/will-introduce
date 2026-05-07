<script setup lang="ts">
const skills = [
  {
    icon: 'i-lucide-code',
    name: '语言与运行时',
    desc: 'TypeScript / JavaScript, Golang, HTML / CSS',
  },
  {
    icon: 'i-lucide-layout-dashboard',
    name: '前端框架',
    desc: 'React / Next.js, Vue / Nuxt, Zustand / Redux',
  },
  {
    icon: 'i-lucide-server',
    name: '后端 & 全栈',
    desc: 'Node.js / Bun, PostgreSQL, Cloudflare',
  },
  {
    icon: 'i-lucide-wrench',
    name: '工程化 & 构建',
    desc: 'Vite / Webpack, Monorepo, ESLint / CI/CD',
  },
  {
    icon: 'i-lucide-sparkles',
    name: 'AI & Agent',
    desc: 'LLM 集成, function calling, Agent 编排',
  },
  {
    icon: 'i-lucide-gauge',
    name: '测试 & 性能',
    desc: 'Jest / Cypress, LCP / CLS 优化, 缓存策略',
  },
]

const projects = [
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
]

const capabilities = [
  { icon: 'i-lucide-rocket', text: '0→1 全栈交付，前后端选型、架构、部署一条龙' },
  { icon: 'i-lucide-package', text: '搭建 Monorepo 工程体系，管多包依赖，搞 CI/CD 流水线' },
  { icon: 'i-lucide-terminal', text: '写 CLI 工具，跨平台命令行应用开发' },
  { icon: 'i-lucide-bot', text: '接大模型做 AI Agent，让用户用对话完成业务操作' },
  { icon: 'i-lucide-zap', text: '性能优化，首屏、包体积、渲染调优来者不拒' },
  { icon: 'i-lucide-sparkles', text: '写干净的代码，搞清晰的架构，用工具链提效率' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section
      class="hero-gradient flex min-h-130 flex-col items-center justify-center gap-7 px-5 py-16 sm:px-20"
    >
      <span class="text-xs font-semibold tracking-[0.2em] text-green-400">HI, I'M</span>
      <h1 class="text-5xl font-bold tracking-[-0.04em] text-white sm:text-[56px]">张卫钰</h1>
      <p class="text-lg font-light tracking-wider text-zinc-400">用代码解决问题，折腾工具链</p>
      <p class="max-w-120 text-center text-sm leading-relaxed text-zinc-500">
        TypeScript · Golang · React · Vue · Node.js — 从 CLI 工具到 AI Agent，从 Monorepo
        到边缘计算，享受把想法变成现实的乐趣。
      </p>
      <div class="mt-5 flex gap-6 text-sm text-zinc-400">
        <span>zwillthink@163.com</span>
        <span class="text-zinc-500">北京</span>
        <span class="text-zinc-500 max-sm:hidden">will-introduce.vercel.app</span>
      </div>
    </section>

    <USeparator />

    <!-- Skills -->
    <section class="px-5 py-20 sm:px-20">
      <div class="mb-12">
        <span class="text-primary text-xs font-semibold tracking-[0.15em]">SKILLS</span>
        <h2 class="mt-2 text-3xl font-bold tracking-[-0.03em] sm:text-[32px]">我会什么</h2>
      </div>
      <div class="divide-default divide-y">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:gap-10"
        >
          <div class="flex w-full items-center gap-3.5 sm:w-50 sm:shrink-0">
            <UIcon :name="skill.icon" class="text-primary size-5" />
            <span class="text-[15px] font-semibold">{{ skill.name }}</span>
          </div>
          <span class="text-muted text-sm">{{ skill.desc }}</span>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Projects -->
    <section class="px-5 py-20 sm:px-20">
      <div class="mb-12">
        <span class="text-primary text-xs font-semibold tracking-[0.15em]">PROJECTS</span>
        <h2 class="mt-2 text-3xl font-bold tracking-[-0.03em] sm:text-[32px]">精选项目</h2>
      </div>
      <div class="flex flex-col gap-8">
        <div
          v-for="project in projects"
          :key="project.name"
          class="border-default flex flex-col gap-2.5 border-b pb-8 last:border-0"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold sm:text-2xl">{{ project.name }}</h3>
            <span class="text-primary text-xs font-semibold tracking-widest">{{
              project.label
            }}</span>
          </div>
          <p class="text-muted text-sm leading-relaxed sm:text-[14px]">
            {{ project.desc }}
          </p>
          <div class="text-muted mt-1 flex gap-5 text-xs">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Capabilities -->
    <section class="px-5 py-20 sm:px-20">
      <div class="mb-12">
        <span class="text-primary text-xs font-semibold tracking-[0.15em]">CAPABILITIES</span>
        <h2 class="mt-2 text-3xl font-bold tracking-[-0.03em] sm:text-[32px]">能力领域</h2>
      </div>
      <div class="flex flex-col">
        <div v-for="cap in capabilities" :key="cap.text" class="flex items-center gap-6 py-4">
          <UIcon :name="cap.icon" class="text-primary size-4.5 shrink-0" />
          <span class="text-muted text-sm leading-relaxed sm:text-[14px]">{{ cap.text }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
