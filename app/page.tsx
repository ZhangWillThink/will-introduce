import {
  ArrowUpRight,
  Atom,
  Bot,
  Braces,
  Camera,
  Dumbbell,
  Github,
  Layers,
  Mail,
  Plane,
  Server,
  Sparkles,
  Wand2,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const profileTags = ['React', 'Vue', 'Node.js', 'GSAP', 'AI']

const skills: { name: string; Icon: LucideIcon }[] = [
  { name: 'React', Icon: Atom },
  { name: 'Vue 3', Icon: Layers },
  { name: 'Node.js', Icon: Server },
  { name: 'GSAP', Icon: Wand2 },
  { name: 'TypeScript', Icon: Braces },
  { name: 'AI / LLM', Icon: Sparkles },
]

const projects = [
  {
    id: 'corporate-site',
    title: '企业官网开发',
    subtitle: 'GSAP · React',
    desc: '结合 GSAP 实现高质量动画交互，为企业打造现代化品牌展示站点',
    tag: '动画',
  },
  {
    id: 'ai-video-library',
    title: 'AI 视频素材库',
    subtitle: 'Node.js · Vector Search',
    desc: '语义检索 + 向量搜索，支持自然语言查询视频素材，智能标签匹配',
    tag: 'AI',
  },
]

const snapshots: { title: string; desc: string; Icon: LucideIcon }[] = [
  {
    title: '动效体验',
    desc: 'GSAP 驱动叙事和微交互反馈',
    Icon: Wand2,
  },
  {
    title: '工程交付',
    desc: '类型安全、规范化与可维护性并重',
    Icon: Wrench,
  },
  {
    title: 'AI 集成',
    desc: '语义检索与智能工作流落地',
    Icon: Bot,
  },
]

const focusAreas = [
  {
    title: '官网体验升级',
    desc: '在保证加载速度的前提下，持续优化品牌叙事、交互动效和信息结构。',
  },
  {
    title: 'AI 功能产品化',
    desc: '把检索、标签和推荐能力封装为可复用模块，减少业务侧接入成本。',
  },
  {
    title: 'Cloudflare 边缘部署',
    desc: '基于 Workers + Pages + Cache 构建边缘发布链路，优化全球访问时延并降低回滚成本。',
  },
  {
    title: '性能与可观测性',
    desc: '建立 Web Vitals、日志与告警闭环，用真实数据持续驱动首屏与交互体验优化。',
  },
]

const capabilityKeywords = ['交互动效', 'AI 功能', '工程质量']

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Will Zhang',
  jobTitle: '前端工程师',
  url: 'https://willzhang.dev',
  email: 'zwillthink@outlook.com',
  sameAs: ['https://github.com/ZhangWillThink'],
  knowsAbout: ['React', 'Vue.js', 'GSAP', 'TypeScript', 'Node.js', 'AI/LLM'],
}

function SectionTitle({ id, title }: { id: string; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.18)] dark:bg-blue-400"
      />
      <h2 id={id} className="text-muted-foreground/70 text-xs tracking-[0.22em] uppercase">
        {title}
      </h2>
    </div>
  )
}

const cardSurfaceClass =
  'group relative overflow-hidden border-border/70 bg-card/70 py-0 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/10'

export default function Home() {
  return (
    <div className="bg-background text-foreground relative isolate flex min-h-svh flex-col overflow-x-clip font-sans selection:bg-blue-500/20 selection:text-blue-950 dark:selection:text-blue-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(139,92,246,0.13),transparent_32%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)] [background-size:44px_44px] opacity-55 [background:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]"
      />
      <div
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute top-20 right-[-4rem] -z-10 h-72 w-72 rounded-full bg-gradient-to-b from-blue-500/14 to-violet-500/10 blur-3xl"
      />

      <a
        href="#main-content"
        className="bg-background text-foreground sr-only absolute top-4 left-4 z-50 rounded-md px-3 py-2 text-sm font-medium shadow-sm focus:not-sr-only focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        跳到主要内容
      </a>

      <header className="border-border/70 bg-background/70 supports-[backdrop-filter]:bg-background/55 sticky top-0 z-40 flex min-h-[52px] shrink-0 items-center justify-between border-b px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white shadow-lg ring-1 shadow-blue-500/25 ring-blue-400/40"
            >
              W
            </div>
            <span
              aria-hidden="true"
              className="ring-background absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2"
            />
          </div>
          <span className="font-semibold tracking-tight">Will Zhang</span>
          <Badge
            variant="outline"
            role="status"
            aria-label="当前状态：可联系"
            className="hidden border-emerald-500/40 bg-emerald-500/10 text-emerald-600 sm:inline-flex dark:text-emerald-400"
          >
            Available
          </Badge>
        </div>

        <nav
          aria-label="联系方式"
          className="text-muted-foreground flex items-center gap-2 text-sm sm:gap-3"
        >
          <a
            href="https://github.com/ZhangWillThink"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="打开 GitHub 主页（新窗口）"
            className="hover:text-foreground focus-visible:ring-ring group/link flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-blue-500/10 focus-visible:ring-2 focus-visible:outline-none"
          >
            <Github aria-hidden="true" className="size-4" />
            GitHub
            <ArrowUpRight
              aria-hidden="true"
              className="size-3 opacity-0 transition-opacity group-hover/link:opacity-100"
            />
          </a>
          <a
            href="mailto:zwillthink@outlook.com"
            aria-label="发送邮件到 zwillthink@outlook.com"
            className="hover:text-foreground focus-visible:ring-ring group/link flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-blue-500/10 focus-visible:ring-2 focus-visible:outline-none"
          >
            <Mail aria-hidden="true" className="size-4" />
            Email
          </a>
        </nav>
      </header>

      <main
        id="main-content"
        className="mx-auto grid w-full max-w-[1460px] flex-1 grid-cols-1 lg:min-h-0 lg:grid-cols-5"
      >
        <section
          aria-labelledby="intro-heading"
          className="animate-reveal-up border-border/70 border-b px-5 py-8 sm:px-8 lg:col-span-2 lg:flex lg:flex-col lg:justify-center lg:border-r lg:border-b-0 lg:px-10 lg:py-7"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="font-mono text-xs tracking-wider text-blue-500 dark:text-blue-400">
              FRONTEND ENGINEER
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"
            />
          </div>

          <h1
            id="intro-heading"
            className="mb-5 text-4xl leading-none font-bold tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            <span className="block">Will</span>
            <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-blue-300 bg-clip-text text-transparent">
              Zhang
            </span>
          </h1>

          <p className="text-muted-foreground mb-6 max-w-prose text-sm leading-relaxed lg:max-w-sm">
            具备全栈能力的前端工程师，擅长用
            <span className="text-foreground font-medium">GSAP</span> 打造高质量动画交互，同时深入
            <span className="text-foreground font-medium"> AI 功能开发</span>
            ，以技术驱动产品体验。
          </p>

          <ul className="mb-2 flex flex-wrap gap-2" aria-label="核心技术标签">
            {profileTags.map(tag => (
              <li key={tag}>
                <Badge
                  variant="outline"
                  className="text-muted-foreground border-border/70 bg-card/65 hover:text-foreground hover:border-blue-400/40"
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>

          <Separator className="from-border/30 to-border/60 my-5 bg-gradient-to-r" />

          <p className="text-muted-foreground max-w-prose text-xs leading-relaxed lg:max-w-sm">
            编码之外，我会去
            <span className="text-foreground inline-flex items-baseline gap-1">
              <Dumbbell aria-hidden="true" className="relative top-[1px] inline size-3" />
              健身或跑步
            </span>
            ，让大脑从代码里抽离出来。慢下来的时候更喜欢带上相机去
            <span className="text-foreground inline-flex items-baseline gap-1">
              <Plane aria-hidden="true" className="relative top-[1px] inline size-3" />
              旅游
            </span>
            ，用
            <span className="text-foreground inline-flex items-baseline gap-1">
              <Camera aria-hidden="true" className="relative top-[1px] inline size-3" />
              镜头
            </span>
            记录陌生城市的光影。偶尔也会泡在
            <a
              href="https://github.com/explore"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="打开 GitHub Explore（新窗口）"
              className="text-foreground focus-visible:ring-ring inline-flex items-baseline gap-1 rounded-sm underline-offset-2 transition-colors hover:text-blue-500 hover:underline focus-visible:ring-2 focus-visible:outline-none dark:hover:text-blue-400"
            >
              <Github aria-hidden="true" className="relative top-[1px] inline size-3" />
              GitHub Explore
            </a>
            里，找那些被低估的好项目。
          </p>

          <ul
            className="mt-5 grid max-w-sm grid-cols-3 gap-2 text-center text-[11px]"
            aria-label="能力关键词"
          >
            {capabilityKeywords.map(item => (
              <li
                key={item}
                className="border-border/70 bg-card/65 text-muted-foreground hover:text-foreground rounded-md border px-2 py-2 backdrop-blur-sm transition-colors hover:border-blue-400/40"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="snapshot-heading"
          className="animate-reveal-up px-5 py-8 sm:px-8 lg:col-span-3 lg:px-10 lg:py-7"
          style={{ animationDelay: '90ms' }}
        >
          <SectionTitle id="snapshot-heading" title="Snapshot" />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="工作概览">
            {snapshots.map(item => (
              <li key={item.title}>
                <Card className={cardSurfaceClass}>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <CardContent className="flex items-start gap-2.5 px-4 py-3">
                    <item.Icon
                      aria-hidden="true"
                      className="mt-0.5 size-4 text-blue-500 dark:text-blue-400"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>

          <Separator className="from-border/30 to-border/60 my-5 bg-gradient-to-r" />

          <SectionTitle id="skills-heading" title="Skills" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="技能列表">
            {skills.map(skill => (
              <li key={skill.name}>
                <Card className={cardSurfaceClass}>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <CardContent className="flex items-center gap-2.5 px-4 py-3">
                    <skill.Icon
                      aria-hidden="true"
                      className="text-muted-foreground size-4 shrink-0 transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400"
                    />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>

          <Separator className="from-border/30 to-border/60 my-5 bg-gradient-to-r" />

          <SectionTitle id="projects-heading" title="Projects" />
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-label="项目列表">
            {projects.map(project => (
              <li key={project.id}>
                <article aria-labelledby={`project-title-${project.id}`}>
                  <Card className={cardSurfaceClass}>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                    />
                    <CardHeader className="gap-1 px-5 pt-5 pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle id={`project-title-${project.id}`} className="text-sm">
                          {project.title}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="bg-muted/70 text-foreground/90 border-border/60 shrink-0 border text-xs"
                        >
                          {project.tag}
                        </Badge>
                      </div>
                      <CardDescription className="font-mono text-xs text-blue-500 dark:text-blue-500/85">
                        {project.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pt-2 pb-5">
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {project.desc}
                      </p>
                    </CardContent>
                  </Card>
                </article>
              </li>
            ))}
          </ul>

          <Separator className="from-border/30 to-border/60 my-5 bg-gradient-to-r" />

          <SectionTitle id="focus-heading" title="Focus" />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="当前关注方向">
            {focusAreas.map(item => (
              <li key={item.title}>
                <Card className={cardSurfaceClass}>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <CardContent className="px-4 py-3">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-border/70 bg-background/70 supports-[backdrop-filter]:bg-background/55 text-muted-foreground relative flex min-h-[40px] shrink-0 flex-wrap items-center justify-between gap-2 border-t px-4 py-2 text-xs backdrop-blur-md sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
        />
        <span>{`© ${new Date().getFullYear()} Will Zhang`}</span>
        <div className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"
          />
          <span>前端工程师 · 全栈能力 · 北京</span>
        </div>
      </footer>
    </div>
  )
}
