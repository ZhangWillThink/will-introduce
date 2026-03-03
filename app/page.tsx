import {
  Atom,
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

export default function Home() {
  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col font-sans">
      <a
        href="#main-content"
        className="bg-background text-foreground sr-only absolute top-4 left-4 z-50 rounded-md px-3 py-2 text-sm font-medium shadow-sm focus:not-sr-only focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        跳到主要内容
      </a>

      <header className="border-border flex min-h-[52px] shrink-0 items-center justify-between border-b px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white shadow-lg shadow-blue-500/20"
          >
            W
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
          className="text-muted-foreground flex items-center gap-3 text-sm sm:gap-5"
        >
          <a
            href="https://github.com/ZhangWillThink"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="打开 GitHub 主页（新窗口）"
            className="hover:text-foreground focus-visible:ring-ring flex items-center gap-1.5 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <Github aria-hidden="true" className="size-4" />
            GitHub
          </a>
          <a
            href="mailto:zwillthink@outlook.com"
            aria-label="发送邮件到 zwillthink@outlook.com"
            className="hover:text-foreground focus-visible:ring-ring flex items-center gap-1.5 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <Mail aria-hidden="true" className="size-4" />
            Email
          </a>
        </nav>
      </header>

      <main id="main-content" className="grid flex-1 grid-cols-1 lg:min-h-0 lg:grid-cols-5">
        <section
          aria-labelledby="intro-heading"
          className="border-border border-b px-5 py-8 sm:px-8 lg:col-span-2 lg:flex lg:flex-col lg:justify-center lg:border-r lg:border-b-0 lg:px-10 lg:py-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="font-mono text-xs tracking-wider text-blue-500 dark:text-blue-400">
              FRONTEND ENGINEER
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-blue-500/40 to-transparent"
            />
          </div>

          <h1
            id="intro-heading"
            className="mb-5 text-4xl leading-none font-bold tracking-tight sm:text-5xl"
          >
            <span className="block">Will</span>
            <span className="block bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              Zhang
            </span>
          </h1>

          <p className="text-muted-foreground mb-6 max-w-prose text-sm leading-relaxed lg:max-w-xs">
            具备全栈能力的前端工程师，擅长用
            <span className="text-foreground font-medium">GSAP</span> 打造高质量动画交互，同时深入
            <span className="text-foreground font-medium"> AI 功能开发</span>
            ，以技术驱动产品体验。
          </p>

          <ul className="mb-2 flex flex-wrap gap-2" aria-label="核心技术标签">
            {profileTags.map(tag => (
              <li key={tag}>
                <Badge variant="outline" className="text-muted-foreground">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>

          <Separator className="my-5" />

          <p className="text-muted-foreground max-w-prose text-xs leading-relaxed lg:max-w-xs">
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
        </section>

        <section
          aria-labelledby="skills-heading"
          className="px-5 py-8 sm:px-8 lg:col-span-3 lg:px-10 lg:py-6"
        >
          <h2
            id="skills-heading"
            className="text-muted-foreground/60 mb-3 text-xs tracking-widest uppercase"
          >
            Skills
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="技能列表">
            {skills.map(skill => (
              <li key={skill.name}>
                <Card className="border-border bg-muted/30 hover:bg-muted/60 gap-0 py-0 transition-colors">
                  <CardContent className="flex items-center gap-2.5 px-4 py-3">
                    <skill.Icon
                      aria-hidden="true"
                      className="text-muted-foreground size-4 shrink-0"
                    />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>

          <Separator className="my-5" />

          <h2
            id="projects-heading"
            className="text-muted-foreground/60 mb-3 text-xs tracking-widest uppercase"
          >
            Projects
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-label="项目列表">
            {projects.map(project => (
              <li key={project.id}>
                <article aria-labelledby={`project-title-${project.id}`}>
                  <Card className="border-border bg-muted/30 hover:bg-muted/60 relative overflow-hidden py-0 transition-colors">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                    />
                    <CardHeader className="gap-1 px-5 pt-5 pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle id={`project-title-${project.id}`} className="text-sm">
                          {project.title}
                        </CardTitle>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          {project.tag}
                        </Badge>
                      </div>
                      <CardDescription className="font-mono text-xs text-blue-500 dark:text-blue-500/80">
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
        </section>
      </main>

      <footer className="border-border text-muted-foreground flex min-h-[40px] shrink-0 flex-wrap items-center justify-between gap-2 border-t px-4 py-2 text-xs sm:px-6 lg:px-8">
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
