'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Dumbbell, Plane, Camera, Github } from 'lucide-react'
import { TerminalWindow } from '@/components/layout/TerminalWindow'
import { Typewriter } from '@/components/effects/Typewriter'
import { Cursor } from '@/components/effects/Cursor'
import { Badge } from '@/components/ui/badge'

const profileTags = ['React', 'Vue', 'Node.js', 'GSAP', 'AI']

const capabilityKeywords = ['交互动效', 'AI 功能', '工程质量']

const typewriterLines = [
  '$ cat will_zhang.txt',
  '',
  '> FRONTEND ENGINEER',
  '> Full-Stack Capable',
  '',
  '具备全栈能力的前端工程师，擅长',
  '用 GSAP 打造高质量动画交互，',
  '同时深入 AI 功能开发，',
  '以技术驱动产品体验。',
  '',
  '$ _',
]

export function HeroTerminal() {
  return (
    <TerminalWindow
      title="Hero Section"
      filename="init_profile.js"
      delay={0.2}
      className="lg:row-span-2"
    >
      <div className="p-4 sm:p-6">
        {/* Title Badge */}
        <div className="mb-4 flex items-center gap-2">
          <span className="font-mono text-xs tracking-wider text-blue-500 dark:text-blue-400">
            FRONTEND ENGINEER
          </span>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-linear-to-r from-blue-500/50 to-transparent"
          />
        </div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-5 text-4xl leading-none font-bold tracking-tight sm:text-5xl"
        >
          <span className="block">Will</span>
          <span className="block bg-linear-to-r from-blue-400 via-violet-400 to-blue-300 bg-clip-text text-transparent">
            Zhang
          </span>
        </motion.h1>

        {/* Typewriter Content */}
        <div className="text-muted-foreground mb-6 min-h-[120px]">
          <Typewriter lines={typewriterLines} speed={40} delay={600} />
          <Cursor className="-mt-6" />
        </div>

        {/* Skill Badges */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mb-6 flex flex-wrap gap-2"
          aria-label="核心技术标签"
        >
          {profileTags.map((tag, index) => (
            <motion.li
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.1, duration: 0.2 }}
            >
              <Badge
                variant="outline"
                className="border-border/70 bg-card/65 hover:text-foreground hover:border-blue-400/40 text-muted-foreground cursor-default"
              >
                {tag}
              </Badge>
            </motion.li>
          ))}
        </motion.ul>

        {/* Capability Keywords */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="grid grid-cols-3 gap-2 text-center text-[11px] max-w-sm"
          aria-label="能力关键词"
        >
          {capabilityKeywords.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + index * 0.1, duration: 0.3 }}
            >
              <div className="border-border/70 bg-card/65 text-muted-foreground hover:text-foreground rounded-md border px-2 py-2 backdrop-blur-sm transition-colors hover:border-blue-400/40">
                {item}
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Personal Interests */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="text-muted-foreground mt-6 text-xs leading-relaxed"
        >
          编码之外，我会去
          <span className="text-foreground inline-flex items-baseline gap-1">
            <Dumbbell aria-hidden="true" className="relative top-px inline size-3" />
            健身或跑步
          </span>
          ，让大脑从代码里抽离出来。慢下来的时候更喜欢带上相机去
          <span className="text-foreground inline-flex items-baseline gap-1">
            <Plane aria-hidden="true" className="relative top-px inline size-3" />
            旅游
          </span>
          ，用
          <span className="text-foreground inline-flex items-baseline gap-1">
            <Camera aria-hidden="true" className="relative top-px inline size-3" />
            镜头
          </span>
          记录陌生城市的光影。偶尔也会浏览
          <a
            href="https://github.com/explore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground focus-visible:ring-ring inline-flex items-baseline gap-1 rounded-sm underline-offset-2 transition-colors hover:text-blue-500 hover:underline focus-visible:ring-2 focus-visible:outline-none dark:hover:text-blue-400"
          >
            <Github aria-hidden="true" className="relative top-px inline size-3" />
            GitHub Explore
          </a>
          。
        </motion.p>
      </div>
    </TerminalWindow>
  )
}
