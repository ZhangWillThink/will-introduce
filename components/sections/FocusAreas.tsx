'use client'

import { motion } from 'framer-motion'
import { Target, Cpu, Cloud, Activity } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TerminalWindow } from '@/components/layout/TerminalWindow'

interface FocusArea {
  title: string
  desc: string
  Icon: LucideIcon
}

const focusAreas: FocusArea[] = [
  {
    title: '官网体验升级',
    desc: '在保证加载速度的前提下，持续优化品牌叙事、交互动画和信息结构。',
    Icon: Target,
  },
  {
    title: 'AI 功能产品化',
    desc: '把检索、标签和推荐能力封装为可复用模块，减少业务侧接入成本。',
    Icon: Cpu,
  },
  {
    title: 'Cloudflare 边缘部署',
    desc: '基于 Workers + Pages + Cache 构建边缘发布链路，优化全球访问时延。',
    Icon: Cloud,
  },
  {
    title: '性能与可观测性',
    desc: '建立 Web Vitals、日志与告警闭环，用真实数据持续驱动体验优化。',
    Icon: Activity,
  },
]

export function FocusAreas() {
  return (
    <TerminalWindow
      title="Focus Areas"
      filename="current_research.md"
      delay={0.5}
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-3">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
              className="group flex items-start gap-3 rounded-lg border border-border/50 bg-card/30 p-3 transition-all duration-300 hover:border-blue-400/30 hover:bg-card/50"
            >
              {/* Icon */}
              <div className="text-blue-500 dark:text-blue-400 mt-0.5">
                <area.Icon className="h-4 w-4" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-sm font-medium">{area.title}</h3>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {area.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TerminalWindow>
  )
}
