'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TerminalCardProps {
  title: string
  children: React.ReactNode
  onClose: () => void
  className?: string
}

export function TerminalCard({
  title,
  children,
  onClose,
  className,
}: TerminalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'w-full max-w-xl overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--primary)_30%,transparent)]',
        'bg-[color-mix(in_srgb,var(--card)_90%,transparent)] backdrop-blur-xl',
        'shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_20%,transparent),0_0_60px_color-mix(in_srgb,var(--primary)_15%,transparent),0_20px_40px_rgba(0,0,0,0.3)]',
        className
      )}
    >
      {/* 标题栏 */}
      <div className="flex items-center justify-between border-b border-border/50 bg-card/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 font-mono text-sm text-muted-foreground">
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* 内容区域 */}
      <div className="max-h-[60vh] overflow-y-auto p-6">
        {children}
      </div>
    </motion.div>
  )
}
