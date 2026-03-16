'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Folder, FolderOpen, ArrowUpRight, Code2, Play } from 'lucide-react'
import { TerminalWindow } from '@/components/layout/TerminalWindow'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Project {
  id: string
  title: string
  subtitle: string
  desc: string
  tag: string
  tags: string[]
  repo?: string
  demo?: string
}

const projects: Project[] = [
  {
    id: 'corporate-site',
    title: '企业官网开发',
    subtitle: 'GSAP · React',
    desc: '结合 GSAP 实现高质量动画交互，为企业打造现代化品牌展示站点',
    tag: '动画',
    tags: ['GSAP', 'React', 'Tailwind'],
    demo: 'https://example.com',
  },
  {
    id: 'ai-video-library',
    title: 'AI 视频素材库',
    subtitle: 'Node.js · Vector Search',
    desc: '语义检索 + 向量搜索，支持自然语言查询视频素材，智能标签匹配',
    tag: 'AI',
    tags: ['Node.js', 'Vector DB', 'AI'],
    repo: 'https://github.com/ZhangWillThink',
  },
]

export function ProjectsList() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <TerminalWindow
      title="Projects"
      filename="ls ./projects"
      delay={0.4}
      className="lg:col-span-2"
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              className="group/project"
            >
              {/* Project Header */}
              <div
                className={cn(
                  'flex cursor-pointer items-start gap-3 rounded-lg border border-border/50 bg-card/30 p-3 transition-all duration-300',
                  'hover:border-blue-400/30 hover:bg-card/50',
                  expandedId === project.id && 'border-blue-400/50 bg-card/60'
                )}
                onClick={() => toggleExpand(project.id)}
              >
                {/* Folder Icon */}
                <motion.div
                  className="text-blue-500 dark:text-blue-400"
                  animate={{ rotate: expandedId === project.id ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedId === project.id ? (
                    <FolderOpen className="h-5 w-5" />
                  ) : (
                    <Folder className="h-5 w-5" />
                  )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-medium">{project.title}</h3>
                      <p className="text-muted-foreground font-mono text-xs text-blue-500 dark:text-blue-400">
                        {project.subtitle}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-muted/70 text-foreground/90 border-border/60 shrink-0 border text-xs"
                    >
                      {project.tag}
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-muted-foreground rounded-full bg-muted/50 px-2 py-0.5 text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expand Indicator */}
                <motion.div
                  animate={{ rotate: expandedId === project.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground mt-0.5"
                >
                  <Code2 className="h-4 w-4" />
                </motion.div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedId === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-border/50 border-l-2 ml-8 pl-3 py-3">
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                        {project.desc}
                      </p>
                      <div className="flex gap-2">
                        {project.repo && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs hover:bg-blue-500/10 hover:border-blue-400/40"
                            asChild
                          >
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Code2 className="mr-1 h-3 w-3" />
                              查看源码
                            </a>
                          </Button>
                        )}
                        {project.demo && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs hover:bg-blue-500/10 hover:border-blue-400/40"
                            asChild
                          >
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Play className="mr-1 h-3 w-3" />
                              在线演示
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </TerminalWindow>
  )
}
