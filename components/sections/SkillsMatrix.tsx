'use client'

import { Atom, Layers, Server, Wand2, Braces, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TerminalWindow } from '@/components/layout/TerminalWindow'
import { ProgressBar } from '@/components/effects/ProgressBar'

interface Skill {
  name: string
  Icon: LucideIcon
  level: number
  color?: 'blue' | 'violet' | 'emerald' | 'amber'
}

const skills: Skill[] = [
  { name: 'React', Icon: Atom, level: 0.85, color: 'blue' },
  { name: 'Vue 3', Icon: Layers, level: 0.80, color: 'violet' },
  { name: 'Node.js', Icon: Server, level: 0.75, color: 'emerald' },
  { name: 'GSAP', Icon: Wand2, level: 0.88, color: 'blue' },
  { name: 'TypeScript', Icon: Braces, level: 0.90, color: 'violet' },
  { name: 'AI/LLM', Icon: Sparkles, level: 0.72, color: 'amber' },
]

export function SkillsMatrix() {
  return (
    <TerminalWindow
      title="Skills"
      filename="skill_matrix.json"
      delay={0.3}
      className="h-full"
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-1">
          {skills.map((skill, index) => (
            <ProgressBar
              key={skill.name}
              value={skill.level}
              label={skill.name}
              icon={<skill.Icon className="h-4 w-4" />}
              color={skill.color}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="border-border/50 mt-4 rounded-lg border bg-card/30 p-3">
          <p className="text-muted-foreground text-xs leading-relaxed">
            <span className="text-foreground font-medium">技术理念：</span>
            追求代码质量与用户体验的平衡，善于将复杂需求转化为优雅的解决方案。
          </p>
        </div>
      </div>
    </TerminalWindow>
  )
}
