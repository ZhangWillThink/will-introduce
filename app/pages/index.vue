<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { projects, site } from '~/config/site'

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
      y: 52,
      duration: 1.05,
      ease: 'power4.out',
      stagger: 0.12,
      delay: 0.1,
    })

    gsap.from('[data-hero-accent]', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.35,
    })

    const sections = root.querySelectorAll<HTMLElement>('[data-animate-section]')
    sections.forEach((section) => {
      const header = section.querySelector('[data-section-header]')
      const items = section.querySelectorAll('[data-section-item]')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })

      if (header) {
        tl.fromTo(
          header,
          { opacity: 0, y: 38 },
          { opacity: 1, y: 0, duration: 0.78, ease: 'power3.out' },
          0,
        )
      }

      if (items.length) {
        tl.fromTo(
          items,
          { opacity: 0, y: 32, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.68,
            stagger: 0.09,
            ease: 'power3.out',
          },
          0.08,
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
    <section
      class="hero-surface relative isolate flex min-h-[max(38rem,90dvh)] flex-col justify-center px-5 py-20 sm:py-24 lg:min-h-[min(92dvh,52rem)]"
      aria-labelledby="hero-heading"
    >
      <div class="page-container w-full">
        <div class="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
          <div
            class="flex flex-col justify-center text-center sm:mx-auto sm:max-w-xl lg:col-span-6 lg:mx-0 lg:max-w-none lg:justify-start lg:pr-4 lg:text-left xl:col-span-7"
          >
            <p
              id="hero-eyebrow"
              data-hero-line
              class="text-primary font-sans text-[0.65rem] font-semibold tracking-[0.32em] sm:text-[0.7rem]"
            >
              HI, I'M
            </p>
            <div
              data-hero-accent
              class="bg-primary/70 mx-auto mt-4 h-px w-12 sm:mt-5 sm:w-16 lg:mx-0 lg:mt-5"
              aria-hidden="true"
            />
            <h1
              id="hero-heading"
              data-hero-line
              class="font-display text-highlighted mt-7 text-[clamp(2.75rem,6.5vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-pretty sm:mt-8 sm:leading-[1.02]"
              translate="no"
            >
              {{ site.name }}
            </h1>
            <p
              data-hero-line
              class="text-toned mt-6 max-w-[26ch] font-sans text-xl leading-snug font-light tracking-[0.02em] sm:mt-7 sm:text-2xl sm:leading-snug lg:max-w-[22ch] lg:tracking-wide"
            >
              {{ site.tagline }}
            </p>
          </div>

          <div
            class="flex min-w-0 flex-col gap-8 text-center lg:col-span-6 lg:gap-10 lg:pt-11 lg:text-left xl:col-span-5"
          >
            <div
              class="border-default/70 flex flex-col gap-6 border-t border-dashed pt-10 lg:border-t-0 lg:border-none lg:pt-0"
            >
              <p
                data-hero-line
                class="text-muted font-sans text-lg leading-[1.75] tracking-[0.01em] sm:text-[1.125rem] sm:leading-[1.72]"
              >
                {{ site.intro }}
              </p>
            </div>
            <address
              data-hero-line
              class="border-default/60 text-muted mt-2 flex flex-col items-center gap-5 border-t border-dotted pt-8 font-sans text-sm not-italic sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:pt-9 lg:mt-6 lg:flex-row lg:flex-wrap lg:items-center lg:justify-start lg:gap-x-10 lg:text-left"
            >
              <span
                class="text-muted shrink-0 text-[0.65rem] font-semibold tracking-[0.24em] uppercase"
              >
                Contact
              </span>
              <div
                class="flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-2 lg:w-auto lg:justify-start lg:gap-x-7"
              >
                <a
                  :href="`mailto:${site.email}`"
                  class="text-default focus-visible:ring-primary/50 hover:text-primary hover:decoration-primary/70 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-base underline decoration-amber-600/45 decoration-dotted underline-offset-[5px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:decoration-amber-400/35"
                  :aria-label="`电子邮箱：${site.email}`"
                >
                  {{ site.email }}
                </a>
                <span class="text-muted hidden sm:inline" aria-hidden="true">·</span>
                <span class="text-toned text-base">{{ site.location }}</span>
                <span class="text-muted hidden sm:inline" aria-hidden="true">·</span>
                <a
                  :href="site.siteUrl"
                  class="text-muted focus-visible:ring-primary/50 hover:text-primary inline-flex min-h-11 items-center justify-center rounded-md text-base transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none max-sm:mt-1"
                  rel="noopener noreferrer"
                  target="_blank"
                  :aria-label="`个人站点（在新标签页打开）：${site.siteUrl}`"
                >
                  {{ site.siteUrl.replace(/^https?:\/\//, '') }}
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>
    </section>

    <USeparator />

    <section id="skills" data-animate-section class="py-24" aria-labelledby="skills-heading">
      <div class="page-container">
        <div data-section-header class="mb-14 max-w-2xl">
          <p class="text-primary font-sans text-[0.7rem] font-semibold tracking-[0.26em]">SKILLS</p>
          <h2
            id="skills-heading"
            class="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] text-pretty sm:text-[2.35rem]"
          >
            我会什么
          </h2>
          <p class="text-muted mt-5 text-base leading-relaxed sm:text-[1.05rem] sm:leading-relaxed">
            工具链与业务并行：从运行时、框架到交付与观测，尽量让复杂系统保持可维护。
          </p>
        </div>
        <ul class="divide-default list-none divide-y" role="list">
          <li
            v-for="skill in skills"
            :key="skill.name"
            data-section-item
            class="flex flex-col gap-3 py-8 sm:flex-row sm:items-start sm:gap-14 sm:py-7"
          >
            <div class="flex w-full items-center gap-4 sm:w-56 sm:shrink-0">
              <UIcon :name="skill.icon" class="text-primary size-6 shrink-0" aria-hidden="true" />
              <span
                class="font-display text-muted text-[1.05rem] font-semibold tracking-wide sm:text-lg"
              >
                {{ skill.name }}
              </span>
            </div>
            <p class="text-muted min-w-0 flex-1 text-base leading-relaxed sm:pt-1">
              {{ skill.desc }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <USeparator />

    <section id="projects" data-animate-section class="py-24" aria-labelledby="projects-heading">
      <div class="page-container">
        <div data-section-header class="mb-14 max-w-2xl">
          <p class="text-primary font-sans text-[0.7rem] font-semibold tracking-[0.26em]">
            PROJECTS
          </p>
          <h2
            id="projects-heading"
            class="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] text-pretty sm:text-[2.35rem]"
          >
            精选项目
          </h2>
          <p class="text-muted mt-5 text-base leading-relaxed sm:text-[1.05rem] sm:leading-relaxed">
            以下为参与或主导的代表性交付（闭源）；侧重可演进架构与工程纪律，不附公开仓库或演示链接。
          </p>
        </div>
        <div class="flex flex-col gap-12">
          <article
            v-for="project in projects"
            :key="project.name"
            data-section-item
            class="border-default bg-default/35 group hover:border-primary/20 flex flex-col gap-4 rounded-2xl border p-7 pb-9 shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg sm:p-9"
          >
            <div class="flex flex-wrap items-baseline justify-between gap-4">
              <h3
                class="font-display text-highlighted text-[1.35rem] font-semibold text-pretty sm:text-3xl sm:tracking-[-0.02em]"
                translate="no"
              >
                {{ project.name }}
              </h3>
              <span
                class="text-primary border-primary/22 rounded-full border px-3 py-1 font-sans text-[0.65rem] font-semibold tracking-[0.2em] uppercase"
              >
                {{ project.label }}
              </span>
            </div>
            <p class="text-muted text-[1.02rem] leading-relaxed">
              {{ project.desc }}
            </p>
            <ul class="text-muted flex list-none flex-wrap gap-2.5 text-sm" aria-label="技术标签">
              <li v-for="tag in project.tags" :key="tag">
                <span class="bg-muted/85 rounded-md px-2.5 py-1 font-medium">{{ tag }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <USeparator />

    <section
      id="capabilities"
      data-animate-section
      class="pt-24 pb-28"
      aria-labelledby="capabilities-heading"
    >
      <div class="page-container">
        <div data-section-header class="mb-14 max-w-2xl">
          <p class="text-primary font-sans text-[0.7rem] font-semibold tracking-[0.26em]">
            CAPABILITIES
          </p>
          <h2
            id="capabilities-heading"
            class="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] text-pretty sm:text-[2.35rem]"
          >
            能力领域
          </h2>
          <p class="text-muted mt-5 text-base leading-relaxed sm:text-[1.05rem] sm:leading-relaxed">
            更偏「交付与协作」层面的工作方式，而不仅是堆栈列表。
          </p>
        </div>
        <ul class="flex list-none flex-col gap-0" role="list">
          <li
            v-for="cap in capabilities"
            :key="cap.text"
            data-section-item
            class="border-default flex gap-5 border-b py-6 last:border-b-0 sm:gap-7 sm:py-5"
          >
            <UIcon
              :name="cap.icon"
              class="text-primary mt-1 size-6 shrink-0 sm:size-5"
              aria-hidden="true"
            />
            <p class="text-muted text-[1.02rem] leading-relaxed sm:text-[1.05rem]">
              {{ cap.text }}
            </p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
