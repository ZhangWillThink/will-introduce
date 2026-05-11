<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { site } from '~/config/site'

const pageRoot = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

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

onMounted(async () => {
  if (!pageRoot.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  gsap.registerPlugin(ScrollTrigger)

  const root = pageRoot.value

  gsapCtx = gsap.context(() => {
    gsap.from('[data-hero-line]', {
      autoAlpha: 0,
      y: 28,
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.09,
      delay: 0.06,
    })

    const sections = root.querySelectorAll<HTMLElement>('[data-animate-section]')
    sections.forEach((section) => {
      const header = section.querySelector('[data-section-header]')
      const items = section.querySelectorAll('[data-section-item]')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      if (header) {
        tl.fromTo(
          header,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          0,
        )
      }

      if (items.length) {
        tl.fromTo(
          items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.48,
            stagger: 0.05,
            ease: 'power2.out',
          },
          0.06,
        )
      }
    })
  }, root)
})

onBeforeUnmount(() => {
  gsapCtx?.revert()
  gsapCtx = null
})
</script>

<template>
  <div ref="pageRoot">
    <!-- Hero：固定深色渐变，与全站主题无关 -->
    <section
      class="hero-gradient flex min-h-[max(32rem,85dvh)] flex-col items-center justify-center gap-6 px-5 py-16"
      aria-labelledby="hero-heading"
    >
      <div class="page-container flex flex-col items-center text-center">
        <p
          id="hero-eyebrow"
          data-hero-line
          class="text-xs font-semibold tracking-[0.2em] text-green-400"
        >
          HI, I'M
        </p>
        <h1
          id="hero-heading"
          data-hero-line
          class="mt-1 text-5xl font-bold tracking-[-0.04em] text-white sm:text-[3.5rem] sm:leading-tight"
        >
          {{ site.name }}
        </h1>
        <p
          data-hero-line
          class="mt-2 text-lg leading-snug font-light tracking-wide text-zinc-300 sm:text-xl"
        >
          {{ site.tagline }}
        </p>
        <p
          data-hero-line
          class="mt-4 max-w-prose text-base leading-relaxed text-zinc-400 sm:text-[1.05rem]"
        >
          {{ site.intro }}
        </p>
        <address
          data-hero-line
          class="mt-8 flex flex-col items-center gap-3 not-italic sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-2"
        >
          <a
            :href="`mailto:${site.email}`"
            class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-base text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-green-400 hover:decoration-green-400/60 focus-visible:ring-green-400"
            :aria-label="`电子邮箱：${site.email}`"
          >
            {{ site.email }}
          </a>
          <span class="hidden text-zinc-500 sm:inline" aria-hidden="true">·</span>
          <span class="text-base text-zinc-400">{{ site.location }}</span>
          <span class="hidden text-zinc-500 sm:inline" aria-hidden="true">·</span>
          <a
            :href="site.siteUrl"
            class="inline-flex min-h-11 items-center justify-center rounded-md text-base text-zinc-400 transition-colors hover:text-green-400 max-sm:mt-1"
            rel="noopener noreferrer"
            target="_blank"
            :aria-label="`个人站点（在新标签页打开）：${site.siteUrl}`"
          >
            {{ site.siteUrl.replace(/^https?:\/\//, '') }}
          </a>
        </address>
      </div>
    </section>

    <USeparator />

    <!-- Skills -->
    <section id="skills" data-animate-section class="py-20" aria-labelledby="skills-heading">
      <div class="page-container">
        <div data-section-header class="mb-12">
          <p class="text-primary text-xs font-semibold tracking-[0.15em]">SKILLS</p>
          <h2 id="skills-heading" class="mt-2 text-3xl font-bold tracking-[-0.03em] sm:text-[2rem]">
            我会什么
          </h2>
          <p class="text-muted mt-3 max-w-prose text-base leading-relaxed sm:text-[1.02rem]">
            工具链与业务并行：从运行时、框架到交付与观测，尽量让复杂系统保持可维护。
          </p>
        </div>
        <ul class="divide-default list-none divide-y" role="list">
          <li
            v-for="skill in skills"
            :key="skill.name"
            data-section-item
            class="flex flex-col gap-2 py-6 sm:flex-row sm:items-start sm:gap-10 sm:py-5"
          >
            <div class="flex w-full items-center gap-3.5 sm:w-52 sm:shrink-0">
              <UIcon :name="skill.icon" class="text-primary size-6 shrink-0" aria-hidden="true" />
              <span class="text-[15px] leading-snug font-semibold sm:text-base">{{
                skill.name
              }}</span>
            </div>
            <p class="text-muted text-base leading-relaxed sm:pt-0.5">{{ skill.desc }}</p>
          </li>
        </ul>
      </div>
    </section>

    <USeparator />

    <!-- Projects -->
    <section id="projects" data-animate-section class="py-20" aria-labelledby="projects-heading">
      <div class="page-container">
        <div data-section-header class="mb-12">
          <p class="text-primary text-xs font-semibold tracking-[0.15em]">PROJECTS</p>
          <h2
            id="projects-heading"
            class="mt-2 text-3xl font-bold tracking-[-0.03em] sm:text-[2rem]"
          >
            精选项目
          </h2>
          <p class="text-muted mt-3 max-w-prose text-base leading-relaxed sm:text-[1.02rem]">
            代表性交付物：从命令行产品到平台面板与边缘架构，侧重可演进与工程纪律。
          </p>
        </div>
        <div class="flex flex-col gap-8">
          <article
            v-for="project in projects"
            :key="project.name"
            data-section-item
            class="border-default bg-default/40 hover:border-primary/25 group flex flex-col gap-3 rounded-xl border p-6 pb-8 shadow-sm transition-[border-color,box-shadow] duration-200 ease-out hover:shadow-md sm:p-8"
          >
            <div class="flex flex-wrap items-baseline justify-between gap-3">
              <h3 class="text-xl font-bold sm:text-2xl">{{ project.name }}</h3>
              <span class="text-primary text-xs font-semibold tracking-widest">{{
                project.label
              }}</span>
            </div>
            <p class="text-muted text-base leading-relaxed">
              {{ project.desc }}
            </p>
            <ul
              class="text-muted mt-2 flex list-none flex-wrap gap-2 text-sm"
              aria-label="技术标签"
            >
              <li v-for="tag in project.tags" :key="tag">
                <span class="bg-muted/80 rounded-md px-2.5 py-1 font-medium">{{ tag }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Capabilities -->
    <section
      id="capabilities"
      data-animate-section
      class="pt-20 pb-24"
      aria-labelledby="capabilities-heading"
    >
      <div class="page-container">
        <div data-section-header class="mb-12">
          <p class="text-primary text-xs font-semibold tracking-[0.15em]">CAPABILITIES</p>
          <h2
            id="capabilities-heading"
            class="mt-2 text-3xl font-bold tracking-[-0.03em] sm:text-[2rem]"
          >
            能力领域
          </h2>
          <p class="text-muted mt-3 max-w-prose text-base leading-relaxed sm:text-[1.02rem]">
            更偏「交付与协作」层面的工作方式，而不仅是堆栈列表。
          </p>
        </div>
        <ul class="flex list-none flex-col gap-0" role="list">
          <li
            v-for="cap in capabilities"
            :key="cap.text"
            data-section-item
            class="border-default flex gap-4 border-b py-5 last:border-b-0 sm:gap-6 sm:py-4"
          >
            <UIcon
              :name="cap.icon"
              class="text-primary mt-0.5 size-6 shrink-0 sm:size-5"
              aria-hidden="true"
            />
            <p class="text-muted text-base leading-relaxed sm:text-[1.02rem]">{{ cap.text }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
