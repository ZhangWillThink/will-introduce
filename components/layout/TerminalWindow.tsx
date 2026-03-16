'use client'

import { motion } from 'framer-motion'
import { X, Minus, Square } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TerminalWindowProps {
  title: string
  filename?: string
  children: React.ReactNode
  className?: string
  delay?: number
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export function TerminalWindow({
  title,
  filename,
  children,
  className,
  delay = 0,
  collapsible = false,
  defaultCollapsed = false,
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={cn(
        'terminal-window group relative overflow-hidden rounded-xl border border-border/70 bg-card/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/10',
        className
      )}
    >
      {/* Top glow line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Title Bar */}
      <div className="border-border/50 flex items-center gap-2 border-b bg-card/50 px-3 py-2">
        {/* Window Controls */}
        <div className="flex items-center gap-1.5">
          <button
            className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
            aria-label="Close"
          />
          <button
            className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"
            aria-label="Minimize"
          />
          <button
            className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"
            aria-label="Maximize"
          />
        </div>

        {/* Filename */}
        {filename && (
          <span className="text-muted-foreground/70 font-mono text-xs tracking-wider">
            {filename}
          </span>
        )}

        {/* Title - pushed to right */}
        <span className="ml-auto text-muted-foreground/50 text-xs">{title}</span>
      </div>

      {/* Content */}
      <div className={cn('overflow-hidden', collapsible && defaultCollapsed && 'hidden')}>
        {children}
      </div>
    </motion.div>
  )
}
