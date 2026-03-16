'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ChevronUp, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Command {
  command: string
  description: string
  action?: () => void
}

const commands: Command[] = [
  { command: 'help', description: '显示帮助信息' },
  { command: 'about', description: '查看个人信息' },
  { command: 'skills', description: '查看技能列表' },
  { command: 'projects', description: '查看项目' },
  { command: 'focus', description: '查看研究方向' },
  { command: 'contact', description: '联系方式' },
  { command: 'theme', description: '切换主题' },
  { command: 'clear', description: '清屏' },
]

interface CommandBarProps {
  onNavigate?: (sectionId: string) => void
}

export function CommandBar({ onNavigate }: CommandBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState<Command[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Toggle with '/' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Filter suggestions
  useEffect(() => {
    if (input) {
      const filtered = commands.filter(cmd =>
        cmd.command.toLowerCase().includes(input.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [input])

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    setHistory(prev => [...prev, command])
    setHistoryIndex(-1)

    // Handle special commands
    switch (command) {
      case 'help':
        alert(commands.map(c => `${c.command} - ${c.description}`).join('\n'))
        break
      case 'about':
        onNavigate?.('hero')
        break
      case 'skills':
        onNavigate?.('skills')
        break
      case 'projects':
        onNavigate?.('projects')
        break
      case 'focus':
        onNavigate?.('focus')
        break
      case 'contact':
        onNavigate?.('contact')
        break
      case 'theme':
        document.querySelector('[aria-label="切换主题"]')?.dispatchEvent(new MouseEvent('click'))
        break
      case 'clear':
        setInput('')
        setSuggestions([])
        return
    }

    setInput('')
    setIsOpen(false)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (suggestions.length > 0) {
        executeCommand(suggestions[0].command)
      } else if (input) {
        executeCommand(input)
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestions.length > 0) {
        setInput(suggestions[0].command)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1)
        if (newIndex === history.length - 1) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="flex justify-center pb-4"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsOpen(true)
                setTimeout(() => inputRef.current?.focus(), 100)
              }}
              className="border-border/70 bg-background/90 backdrop-blur-sm hover:bg-blue-500/10 hover:border-blue-400/40"
            >
              <Terminal className="mr-2 h-4 w-4" />
              输入命令 (按 /)
              <ChevronUp className="ml-2 h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Input */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="border-border/70 bg-background/95 backdrop-blur-md border-t p-4"
          >
            <div className="mx-auto max-w-3xl">
              {/* Input Row */}
              <div className="relative flex items-center gap-2">
                <span className="text-blue-500 dark:text-blue-400 font-mono text-sm">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入命令 (help, skills, projects...)"
                  className="flex-1 border-none bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground/50"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 hover:bg-muted/50"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {suggestions.map((cmd, index) => (
                    <button
                      key={cmd.command}
                      onClick={() => executeCommand(cmd.command)}
                      className={cn(
                        'flex items-center gap-2 rounded-md border border-border/50 bg-card/50 px-3 py-2 text-left transition-colors hover:border-blue-400/40 hover:bg-blue-500/10',
                        index === 0 && 'ring-1 ring-blue-500/50'
                      )}
                    >
                      <span className="font-mono text-xs font-medium text-blue-500 dark:text-blue-400">
                        {cmd.command}
                      </span>
                      <span className="text-muted-foreground text-xs">{cmd.description}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Help Text */}
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span>
                    <kbd className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                      Enter
                    </kbd>{' '}
                    执行
                  </span>
                  <span>
                    <kbd className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                      Tab
                    </kbd>{' '}
                    补全
                  </span>
                  <span>
                    <kbd className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                      ↑↓
                    </kbd>{' '}
                    历史
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  关闭 <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
