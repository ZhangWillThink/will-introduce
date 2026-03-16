'use client'

import { motion } from 'framer-motion'
import { Github, Mail } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Badge } from '@/components/ui/badge'

export function StatusBar() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="border-border/70 bg-background/70 supports-backdrop-filter:bg-background/55 sticky top-0 z-40 flex min-h-12 shrink-0 items-center justify-between border-b px-4 backdrop-blur-md sm:px-6 lg:px-8"
    >
      {/* Left: Logo + Name + Title */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-violet-600 text-xs font-bold text-white shadow-lg ring-1 shadow-blue-500/25 ring-blue-400/40">
            W
          </div>
          <span
            aria-hidden="true"
            className="ring-background absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2"
          />
        </div>

        {/* Name */}
        <span className="font-semibold tracking-tight">Will Zhang</span>

        {/* Title Badge */}
        <Badge
          variant="outline"
          className="hidden border-emerald-500/40 bg-emerald-500/10 text-emerald-600 sm:inline-flex dark:text-emerald-400"
        >
          FRONTEND ENGINEER
        </Badge>
      </div>

      {/* Center: Status Indicator */}
      <div className="hidden items-center gap-2 sm:flex">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-muted-foreground text-xs">Available for opportunities</span>
        </div>
      </div>

      {/* Right: Actions */}
      <nav className="flex items-center gap-1.5" aria-label="联系方式">
        <a
          href="https://github.com/ZhangWillThink"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground text-muted-foreground hover:bg-blue-500/10 rounded-md p-2 transition-colors"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href="mailto:zwillthink@outlook.com"
          className="hover:text-foreground text-muted-foreground hover:bg-blue-500/10 rounded-md p-2 transition-colors"
          aria-label="Email"
        >
          <Mail className="h-4 w-4" />
        </a>
        <ThemeToggle />
      </nav>
    </motion.header>
  )
}
