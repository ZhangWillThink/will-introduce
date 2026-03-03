import { Camera, Dumbbell, Github, Mail, Plane } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const skills = [
  { name: 'React', icon: '⚛️' },
  { name: 'Vue 3', icon: '💚' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'GSAP', icon: '🎬' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'AI / LLM', icon: '🤖' },
]

const projects = [
  {
    title: '企业官网开发',
    subtitle: 'GSAP · React',
    desc: '结合 GSAP 实现高质量动画交互，为企业打造现代化品牌展示站点',
    tag: '动画',
  },
  {
    title: 'AI 视频素材库',
    subtitle: 'Node.js · Vector Search',
    desc: '语义检索 + 向量搜索，支持自然语言查询视频素材，智能标签匹配',
    tag: 'AI',
  },
]

export default function Home() {
  return (
    // 严格限制为一屏，禁止任何滚动
    <div className="bg-background text-foreground flex h-screen flex-col overflow-hidden font-sans">
      {/* ── 顶部导航栏 ── */}
      <header
        className="border-border flex shrink-0 items-center justify-between border-b px-8"
        style={{ height: '52px' }}
      >
        <div className="flex items-center gap-3">
          {/* 头像徽章 */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
            W
          </div>
          <span className="font-semibold tracking-tight">Will Zhang</span>
          {/* shadcn Badge — 在线状态 */}
          <Badge
            variant="outline"
            className="hidden border-emerald-500/40 bg-emerald-500/10 text-emerald-600 sm:inline-flex dark:text-emerald-400"
          >
            Available
          </Badge>
        </div>

        {/* 联系方式链接 */}
        <nav className="text-muted-foreground flex items-center gap-5 text-sm">
          <a
            href="https://github.com/ZhangWillThink"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Github className="size-4" />
            GitHub
          </a>
          <a
            href="mailto:zwillthink@outlook.com"
            className="hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Mail className="size-4" />
            Email
          </a>
        </nav>
      </header>

      {/* ── 主内容区（两栏布局）── */}
      <main className="grid min-h-0 flex-1 grid-cols-5 overflow-hidden">
        {/* ── 左栏：Hero 区 ── */}
        <section className="border-border col-span-2 flex flex-col justify-center border-r px-10 py-6">
          {/* 职位 */}
          <div className="mb-4 flex items-center gap-2">
            <span className="font-mono text-xs tracking-wider text-blue-500 dark:text-blue-400">
              FRONTEND ENGINEER
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-blue-500/40 to-transparent" />
          </div>

          {/* 姓名 */}
          <h1 className="mb-1 text-5xl leading-none font-bold tracking-tight">Will</h1>
          <h1 className="mb-5 text-5xl leading-none font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              Zhang
            </span>
          </h1>

          {/* 简介 */}
          <p className="text-muted-foreground mb-6 max-w-xs text-sm leading-relaxed">
            具备全栈能力的前端工程师，擅长用
            <span className="text-foreground font-medium">GSAP</span> 打造高质量动画交互，同时深入
            <span className="text-foreground font-medium"> AI 功能开发</span>
            ，以技术驱动产品体验。
          </p>

          {/* shadcn Badge — 技术标签行 */}
          <div className="flex flex-wrap gap-2">
            {['React', 'Vue', 'Node.js', 'GSAP', 'AI'].map(tag => (
              <Badge key={tag} variant="outline" className="text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>

          {/* ── 爱好叙事段 ── */}
          <Separator className="my-5" />
          <p className="text-muted-foreground max-w-xs text-xs leading-relaxed">
            编码之外，我会去{' '}
            <span className="text-foreground inline-flex items-baseline gap-1">
              <Dumbbell className="relative top-[1px] inline size-3" />
              健身或跑步
            </span>
            ，让大脑从代码里抽离出来。慢下来的时候更喜欢带上相机去{' '}
            <span className="text-foreground inline-flex items-baseline gap-1">
              <Plane className="relative top-[1px] inline size-3" />
              旅游
            </span>
            ，用{' '}
            <span className="text-foreground inline-flex items-baseline gap-1">
              <Camera className="relative top-[1px] inline size-3" />
              镜头
            </span>
            记录陌生城市的光影。偶尔也会泡在{' '}
            <a
              href="https://github.com/explore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-blue-500 dark:hover:text-blue-400 inline-flex items-baseline gap-1 underline-offset-2 transition-colors hover:underline"
            >
              <Github className="relative top-[1px] inline size-3" />
              GitHub Explore
            </a>{' '}
            里，找那些被低估的好项目。
          </p>
        </section>

        {/* ── 右栏：技能 + 项目 ── */}
        <section className="col-span-3 flex min-h-0 flex-col overflow-hidden px-10 py-6">
          {/* ── 技能区域 ── */}
          <h2 className="text-muted-foreground/60 mb-3 text-xs tracking-widest uppercase">
            Skills
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {skills.map(skill => (
              // shadcn Card — 技能卡片
              <Card
                key={skill.name}
                className="border-border bg-muted/30 hover:bg-muted/60 gap-0 py-0 transition-colors"
              >
                <CardContent className="flex items-center gap-2.5 px-4 py-3">
                  <span className="text-base">{skill.icon}</span>
                  <span className="text-sm font-medium">{skill.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* shadcn Separator — 使用 border 颜色变量，自动跟随主题 */}
          <Separator className="my-5" />

          {/* ── 项目区域 ── */}
          <h2 className="text-muted-foreground/60 mb-3 text-xs tracking-widest uppercase">
            Projects
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map(project => (
              // shadcn Card — 项目卡片
              <Card
                key={project.title}
                className="border-border bg-muted/30 hover:bg-muted/60 relative overflow-hidden py-0 transition-colors"
              >
                {/* 顶部光线装饰 */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                <CardHeader className="gap-1 px-5 pt-5 pb-0">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm">{project.title}</CardTitle>
                    {/* shadcn Badge — 项目类型 */}
                    <Badge variant="secondary" className="ml-2 shrink-0 text-xs">
                      {project.tag}
                    </Badge>
                  </div>
                  <CardDescription className="font-mono text-xs text-blue-500 dark:text-blue-500/80">
                    {project.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-5 pt-2 pb-5">
                  <p className="text-muted-foreground text-xs leading-relaxed">{project.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* ── 底部状态栏 ── */}
      <footer
        className="border-border text-muted-foreground flex shrink-0 items-center justify-between border-t px-8 text-xs"
        style={{ height: '40px' }}
      >
        <span>© 2026 Will Zhang</span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          <span>前端工程师 · 全栈能力 · 北京</span>
        </div>
      </footer>
    </div>
  )
}
