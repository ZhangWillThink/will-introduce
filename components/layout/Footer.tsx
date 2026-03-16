'use client'

import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="border-border/70 bg-background/70 supports-backdrop-filter:bg-background/55 text-muted-foreground relative flex min-h-10 shrink-0 flex-wrap items-center justify-between gap-2 border-t px-4 py-2 text-xs backdrop-blur-md sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent"
      />
      <span>© {currentYear} Will Zhang</span>
      <div className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"
        />
        <span>前端工程师 · 全栈能力 · 北京</span>
      </div>
    </motion.footer>
  )
}
