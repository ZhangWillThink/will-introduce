# 沉浸式终端模式实施计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为「赛博控制台」个人网站添加全屏沉浸式终端模式，用户可按 `~` 键进入，输入命令查看内容，ESC 或 `exit` 退出

**Architecture:** 使用 React Context 管理终端模式状态，创建 TerminalMode 组件覆盖全屏，命令处理器解析输入并展示内容卡片，Framer Motion 处理动画过渡

**Tech Stack:** Next.js + React + TypeScript + Tailwind CSS + Framer Motion + shadcn/ui

---

## 文件结构

```
components/
├── terminal/
│   ├── TerminalMode.tsx          # 主容器组件
│   ├── TerminalProvider.tsx      # Context Provider
│   ├── TerminalInput.tsx         # 输入区域
│   ├── TerminalOutput.tsx        # 输出显示
│   ├── CommandProcessor.ts       # 命令解析器
│   ├── useTerminal.ts            # 组合 Hook
│   └── cards/
│       ├── TerminalCard.tsx      # 卡片基础组件
│       ├── HelpCard.tsx          # 帮助卡片
│       ├── AboutCard.tsx         # 关于卡片
│       ├── SkillsCard.tsx        # 技能卡片
│       ├── ProjectsCard.tsx      # 项目卡片
│       ├── FocusCard.tsx         # 研究方向卡片
│       └── ContactCard.tsx       # 联系方式卡片
└── ...existing components

hooks/
├── useKeyboardHandler.ts         # 全局键盘监听
└── useCommandHistory.ts          # 命令历史管理

types/
└── terminal.ts                   # TypeScript 类型定义
```

---

## Task 1: 创建类型定义

**Files:**

- Create: `types/terminal.ts`

**目标:** 定义终端模式所需的 TypeScript 类型

- [ ] **Step 1: 编写类型定义**

```typescript
// types/terminal.ts

export type CardType = "help" | "about" | "skills" | "projects" | "focus" | "contact" | null;

export interface Command {
  name: string;
  aliases: string[];
  description: string;
  handler: (args?: string) => CommandResult;
}

export interface CommandResult {
  type: "text" | "card" | "action";
  content?: string;
  cardType?: CardType;
  action?: () => void;
}

export interface TerminalState {
  isOpen: boolean;
  input: string;
  output: OutputItem[];
  history: string[];
  historyIndex: number;
  activeCard: CardType;
}

export interface OutputItem {
  command: string;
  timestamp: number;
  type: "command" | "output" | "error";
  content?: string;
}

export interface TerminalContextType {
  isOpen: boolean;
  activeCard: CardType;
  input: string;
  output: OutputItem[];
  openTerminal: () => void;
  closeTerminal: () => void;
  setInput: (input: string) => void;
  executeCommand: (command: string) => void;
  showCard: (cardType: CardType) => void;
  hideCard: () => void;
  goBack: () => void;
}
```

- [ ] **Step 2: 验证类型定义**

检查是否有类型错误，确保类型可以被正确导入。

- [ ] **Step 3: Commit**

```bash
git add types/terminal.ts
git commit -m "feat(terminal): add TypeScript type definitions for terminal mode"
```

---

## Task 2: 创建命令处理器

**Files:**

- Create: `components/terminal/CommandProcessor.ts`

**目标:** 实现命令解析和执行逻辑

- [ ] **Step 1: 编写命令处理器**

```typescript
// components/terminal/CommandProcessor.ts
import type { Command, CommandResult, CardType } from "@/types/terminal";

const commands: Command[] = [
  {
    name: "help",
    aliases: ["?", "h"],
    description: "显示所有可用命令",
    handler: () => ({
      type: "card",
      cardType: "help" as CardType,
    }),
  },
  {
    name: "about",
    aliases: ["whoami"],
    description: "查看个人介绍",
    handler: () => ({
      type: "card",
      cardType: "about" as CardType,
    }),
  },
  {
    name: "skills",
    aliases: ["tech", "stack"],
    description: "查看技能矩阵",
    handler: () => ({
      type: "card",
      cardType: "skills" as CardType,
    }),
  },
  {
    name: "projects",
    aliases: ["ls", "work"],
    description: "查看项目列表",
    handler: () => ({
      type: "card",
      cardType: "projects" as CardType,
    }),
  },
  {
    name: "focus",
    aliases: ["research"],
    description: "查看研究方向",
    handler: () => ({
      type: "card",
      cardType: "focus" as CardType,
    }),
  },
  {
    name: "contact",
    aliases: ["reach"],
    description: "查看联系方式",
    handler: () => ({
      type: "card",
      cardType: "contact" as CardType,
    }),
  },
  {
    name: "theme",
    aliases: [],
    description: "切换主题",
    handler: (args) => ({
      type: "action",
      action: () => {
        const event = new MouseEvent("click");
        const button = document.querySelector('[aria-label="切换主题"]') as HTMLButtonElement;
        button?.dispatchEvent(event);
      },
      content: args ? `切换到 ${args} 主题` : "主题已切换",
    }),
  },
  {
    name: "clear",
    aliases: ["cls"],
    description: "清屏",
    handler: () => ({
      type: "action",
      content: "屏幕已清空",
    }),
  },
  {
    name: "exit",
    aliases: ["quit", "q"],
    description: "退出终端模式",
    handler: () => ({
      type: "action",
      content: "正在退出...",
    }),
  },
];

export function findCommand(input: string): Command | undefined {
  const lowerInput = input.toLowerCase().trim();
  const parts = lowerInput.split(/\s+/);
  const cmdName = parts[0];

  return commands.find((cmd) => cmd.name === cmdName || cmd.aliases.includes(cmdName));
}

export function getCommandList(): Command[] {
  return commands;
}

export function processCommand(input: string): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { type: "text", content: "" };
  }

  const parts = trimmed.split(/\s+/);
  const cmdName = parts[0];
  const args = parts.slice(1).join(" ");

  const cmd = findCommand(cmdName);

  if (!cmd) {
    return {
      type: "text",
      content: `命令不存在：${cmdName}\n输入 'help' 查看可用命令`,
    };
  }

  return cmd.handler(args);
}

export function getSuggestions(input: string): Command[] {
  const lowerInput = input.toLowerCase().trim();
  if (!lowerInput) return [];

  return commands.filter(
    (cmd) =>
      cmd.name.startsWith(lowerInput) || cmd.aliases.some((alias) => alias.startsWith(lowerInput)),
  );
}
```

- [ ] **Step 2: 验证导入**

确保类型导入正确，没有编译错误。

- [ ] **Step 3: Commit**

```bash
git add components/terminal/CommandProcessor.ts
git commit -m "feat(terminal): add command processor with help, about, skills, projects, focus, contact commands"
```

---

## Task 3: 创建命令历史 Hook

**Files:**

- Create: `hooks/useCommandHistory.ts`

**目标:** 管理命令历史记录（使用 sessionStorage）

- [ ] **Step 1: 编写 Hook**

```typescript
// hooks/useCommandHistory.ts
import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "terminal-command-history";
const MAX_HISTORY = 20;

export function useCommandHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // 从 sessionStorage 加载
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    }
  }, []);

  // 保存到 sessionStorage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = useCallback((command: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((cmd) => cmd !== command);
      return [command, ...filtered].slice(0, MAX_HISTORY);
    });
    setHistoryIndex(-1);
  }, []);

  const navigateHistory = useCallback(
    (direction: "up" | "down"): string | null => {
      if (history.length === 0) return null;

      if (direction === "up") {
        const newIndex = historyIndex === -1 ? 0 : Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        return history[newIndex];
      } else {
        const newIndex = historyIndex - 1;
        if (newIndex < 0) {
          setHistoryIndex(-1);
          return "";
        }
        setHistoryIndex(newIndex);
        return history[newIndex];
      }
    },
    [history, historyIndex],
  );

  const resetHistoryIndex = useCallback(() => {
    setHistoryIndex(-1);
  }, []);

  return {
    history,
    historyIndex,
    addToHistory,
    navigateHistory,
    resetHistoryIndex,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add hooks/useCommandHistory.ts
git commit -m "feat(terminal): add useCommandHistory hook for command history management"
```

---

## Task 4: 创建 Terminal Provider

**Files:**

- Create: `components/terminal/TerminalProvider.tsx`

**目标:** 创建 React Context 管理终端模式状态

- [ ] **Step 1: 编写 Provider**

```typescript
// components/terminal/TerminalProvider.tsx
'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react'
import type {
  TerminalContextType,
  CardType,
  OutputItem,
} from '@/types/terminal'
import { processCommand, findCommand } from './CommandProcessor'
import { useCommandHistory } from '@/hooks/useCommandHistory'

const TerminalContext = createContext<TerminalContextType | null>(null)

export function useTerminal() {
  const context = useContext(TerminalContext)
  if (!context) {
    throw new Error('useTerminal must be used within TerminalProvider')
  }
  return context
}

interface TerminalProviderProps {
  children: React.ReactNode
}

export function TerminalProvider({ children }: TerminalProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInputState] = useState('')
  const [output, setOutput] = useState<OutputItem[]>([])
  const [activeCard, setActiveCard] = useState<CardType>(null)
  const [prevCardStack, setPrevCardStack] = useState<CardType[]>([])

  const {
    addToHistory,
    navigateHistory,
    resetHistoryIndex,
  } = useCommandHistory()

  const openTerminal = useCallback(() => {
    setIsOpen(true)
    setInputState('')
    setActiveCard(null)
    setPrevCardStack([])
  }, [])

  const closeTerminal = useCallback(() => {
    setIsOpen(false)
    setInputState('')
    setOutput([])
    setActiveCard(null)
    setPrevCardStack([])
    resetHistoryIndex()
  }, [resetHistoryIndex])

  const setInput = useCallback((value: string) => {
    setInputState(value)
  }, [])

  const showCard = useCallback(
    (cardType: CardType) => {
      if (activeCard) {
        setPrevCardStack((prev) => [...prev, activeCard])
      }
      setActiveCard(cardType)
    },
    [activeCard]
  )

  const hideCard = useCallback(() => {
    setActiveCard(null)
    setPrevCardStack([])
  }, [])

  const goBack = useCallback(() => {
    if (prevCardStack.length > 0) {
      const prevCard = prevCardStack[prevCardStack.length - 1]
      setPrevCardStack((prev) => prev.slice(0, -1))
      setActiveCard(prevCard)
    } else {
      setActiveCard(null)
    }
  }, [prevCardStack])

  const executeCommand = useCallback(
    (command: string) => {
      const trimmed = command.trim()
      if (!trimmed) return

      // 添加到历史
      addToHistory(trimmed)

      // 记录命令到输出
      setOutput((prev) => [
        ...prev,
        { command: trimmed, timestamp: Date.now(), type: 'command' },
      ])

      // 执行命令
      const result = processCommand(trimmed)

      switch (result.type) {
        case 'card':
          if (result.cardType) {
            showCard(result.cardType)
          }
          break
        case 'action':
          if (result.action) {
            result.action()
          }
          if (trimmed.startsWith('exit') || trimmed.startsWith('quit')) {
            setTimeout(() => closeTerminal(), 300)
          }
          if (trimmed.startsWith('clear') || trimmed.startsWith('cls')) {
            setOutput([])
          }
          break
        case 'text':
        default:
          setOutput((prev) => [
            ...prev,
            {
              command: '',
              timestamp: Date.now(),
              type: result.content?.includes('不存在') ? 'error' : 'output',
              content: result.content,
            },
          ])
      }

      // 清空输入
      setInputState('')
    },
    [addToHistory, showCard, closeTerminal]
  )

  const value = useMemo(
    () => ({
      isOpen,
      activeCard,
      input,
      output,
      openTerminal,
      closeTerminal,
      setInput,
      executeCommand,
      showCard,
      hideCard,
      goBack,
    }),
    [
      isOpen,
      activeCard,
      input,
      output,
      openTerminal,
      closeTerminal,
      setInput,
      executeCommand,
      showCard,
      hideCard,
      goBack,
    ]
  )

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/terminal/TerminalProvider.tsx
git commit -m "feat(terminal): add TerminalProvider context for state management"
```

---

## Task 5: 创建内容卡片组件

**Files:**

- Create: `components/terminal/cards/TerminalCard.tsx`
- Create: `components/terminal/cards/HelpCard.tsx`
- Create: `components/terminal/cards/AboutCard.tsx`
- Create: `components/terminal/cards/SkillsCard.tsx`
- Create: `components/terminal/cards/ProjectsCard.tsx`
- Create: `components/terminal/cards/FocusCard.tsx`
- Create: `components/terminal/cards/ContactCard.tsx`
- Create: `components/terminal/cards/index.ts`

**目标:** 创建内容展示卡片组件

- [ ] **Step 1: 创建卡片基础组件**

```typescript
// components/terminal/cards/TerminalCard.tsx
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
```

- [ ] **Step 2: 创建 HelpCard**

```typescript
// components/terminal/cards/HelpCard.tsx
import { TerminalCard } from './TerminalCard'
import { getCommandList } from '../CommandProcessor'

interface HelpCardProps {
  onClose: () => void
}

export function HelpCard({ onClose }: HelpCardProps) {
  const commands = getCommandList()
  const categories = ['navigation', 'info', 'action', 'system']
  const categoryNames: Record<string, string> = {
    navigation: '导航',
    info: '信息',
    action: '操作',
    system: '系统',
  }

  return (
    <TerminalCard title="help.txt" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          可用命令列表
        </p>

        {categories.map((cat) => {
          const catCommands = commands.filter((c) => {
            if (cat === 'navigation') return ['help'].includes(c.name)
            if (cat === 'info') return ['about', 'skills', 'projects', 'focus', 'contact'].includes(c.name)
            if (cat === 'action') return ['theme'].includes(c.name)
            if (cat === 'system') return ['clear', 'exit'].includes(c.name)
            return false
          })

          if (catCommands.length === 0) return null

          return (
            <div key={cat}>
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                {categoryNames[cat]}
              </h3>
              <div className="space-y-2">
                {catCommands.map((cmd) => (
                  <div key={cmd.name} className="flex items-start gap-3">
                    <span className="font-mono text-sm text-emerald-400 min-w-[80px]">
                      {cmd.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {cmd.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div className="border-t border-border/50 pt-4 text-xs text-muted-foreground">
          <p>快捷键：</p>
          <ul className="mt-1 space-y-1">
            <li>• <kbd className="rounded bg-muted px-1 py-0.5 font-mono">~</kbd> 进入终端模式</li>
            <li>• <kbd className="rounded bg-muted px-1 py-0.5 font-mono">ESC</kbd> 返回 / 退出</li>
            <li>• <kbd className="rounded bg-muted px-1 py-0.5 font-mono">Tab</kbd> 命令补全</li>
            <li>• <kbd className="rounded bg-muted px-1 py-0.5 font-mono">↑↓</kbd> 浏览历史</li>
          </ul>
        </div>
      </div>
    </TerminalCard>
  )
}
```

- [ ] **Step 3: 创建 AboutCard**

```typescript
// components/terminal/cards/AboutCard.tsx
import { TerminalCard } from './TerminalCard'
import { Badge } from '@/components/ui/badge'

interface AboutCardProps {
  onClose: () => void
}

export function AboutCard({ onClose }: AboutCardProps) {
  return (
    <TerminalCard title="about.md" onClose={onClose}>
      <div className="space-y-6">
        {/* ASCII Art 标题 */}
        <pre className="text-xs leading-relaxed text-primary/80 overflow-x-auto">
{`   __      __   _
   \\ \\    / /__| | __ _ _ __
    \\ \\/\\ / _ \\ |/ _\\` | | '_ \\
     \\ /\\  /  __/ | (_| | | | |
      \\/  \\/ \\___|_|\\__,_|_| |_|`}
        </pre>

        <div className="space-y-2">
          <h2 className="text-xl font-bold">Will Zhang</h2>
          <Badge variant="outline" className="font-mono text-xs">
            FRONTEND ENGINEER
          </Badge>
        </div>

        <p className="text-sm leading-relaxed text-foreground">
          具备全栈能力的前端工程师，擅长用 GSAP 打造高质量动画交互，
          同时深入 AI 功能开发，以技术驱动产品体验。
        </p>

        <div className="flex flex-wrap gap-2">
          {['React', 'Vue', 'Node.js', 'GSAP', 'TypeScript', 'AI/LLM'].map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-primary/10 px-2 py-1 text-xs font-mono text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </TerminalCard>
  )
}
```

- [ ] **Step 4: 创建 SkillsCard**

```typescript
// components/terminal/cards/SkillsCard.tsx
import { TerminalCard } from './TerminalCard'
import { ProgressBar } from '@/components/effects/ProgressBar'

interface SkillsCardProps {
  onClose: () => void
}

const skills = [
  { name: 'React', level: 85, color: 'from-blue-500 to-cyan-400' },
  { name: 'Vue 3', level: 80, color: 'from-emerald-500 to-green-400' },
  { name: 'Node.js', level: 75, color: 'from-green-500 to-emerald-400' },
  { name: 'GSAP', level: 88, color: 'from-violet-500 to-purple-400' },
  { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-400' },
  { name: 'AI/LLM', level: 72, color: 'from-orange-500 to-amber-400' },
]

export function SkillsCard({ onClose }: SkillsCardProps) {
  return (
    <TerminalCard title="skills.json" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          技术栈熟练度评估
        </p>

        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{skill.name}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted/50">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </TerminalCard>
  )
}
```

- [ ] **Step 5: 创建 ProjectsCard**

```typescript
// components/terminal/cards/ProjectsCard.tsx
import { TerminalCard } from './TerminalCard'
import { Folder, ExternalLink } from 'lucide-react'

interface ProjectsCardProps {
  onClose: () => void
}

const projects = [
  {
    name: 'corporate-site',
    tech: ['GSAP', 'React'],
    description: '高质量动画交互，品牌展示站点',
    color: 'border-blue-500',
  },
  {
    name: 'ai-video-library',
    tech: ['Node.js', 'Vector Search'],
    description: '语义检索 + 向量搜索，智能标签匹配',
    color: 'border-violet-500',
  },
]

export function ProjectsCard({ onClose }: ProjectsCardProps) {
  return (
    <TerminalCard title="projects/" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          精选项目展示
        </p>

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className={`group border-l-2 ${project.color} bg-card/30 p-4 transition-colors hover:bg-card/50`}
            >
              <div className="flex items-start gap-3">
                <Folder className="mt-0.5 h-5 w-5 text-emerald-400" />
                <div className="flex-1">
                  <h3 className="font-mono text-sm text-emerald-400">
                    {project.name}/
                  </h3>
                  <p className="mt-1 text-sm text-foreground">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-muted/50 px-2 py-0.5 text-xs font-mono text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TerminalCard>
  )
}
```

- [ ] **Step 6: 创建 FocusCard**

```typescript
// components/terminal/cards/FocusCard.tsx
import { TerminalCard } from './TerminalCard'

interface FocusCardProps {
  onClose: () => void
}

const focusAreas = [
  { icon: '🎯', title: '官网体验升级', desc: '动画与交互深度优化' },
  { icon: '🤖', title: 'AI 功能产品化', desc: 'LLM 应用落地实践' },
  { icon: '☁️', title: 'Cloudflare 边缘部署', desc: '边缘计算与性能优化' },
  { icon: '📊', title: '性能与可观测性', desc: '监控体系与性能调优' },
]

export function FocusCard({ onClose }: FocusCardProps) {
  return (
    <TerminalCard title="focus.md" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          当前研究方向
        </p>

        <div className="grid gap-3">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/30 p-4 transition-colors hover:bg-card/50"
            >
              <span className="text-2xl">{area.icon}</span>
              <div>
                <h3 className="font-medium">{area.title}</h3>
                <p className="text-sm text-muted-foreground">{area.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TerminalCard>
  )
}
```

- [ ] **Step 7: 创建 ContactCard**

```typescript
// components/terminal/cards/ContactCard.tsx
import { TerminalCard } from './TerminalCard'
import { Mail, Github, MapPin } from 'lucide-react'

interface ContactCardProps {
  onClose: () => void
}

export function ContactCard({ onClose }: ContactCardProps) {
  return (
    <TerminalCard title="contact.log" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          联系方式与社交链接
        </p>

        <div className="space-y-4 font-mono text-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-400" />
            <div>
              <span className="text-muted-foreground">Email:</span>
              <a
                href="mailto:zwillthink@outlook.com"
                className="ml-2 text-emerald-400 hover:underline"
              >
                zwillthink@outlook.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Github className="h-5 w-5 text-blue-400" />
            <div>
              <span className="text-muted-foreground">GitHub:</span>
              <a
                href="https://github.com/ZhangWillThink"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-emerald-400 hover:underline"
              >
                @ZhangWillThink
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-400" />
            <div>
              <span className="text-muted-foreground">Location:</span>
              <span className="ml-2 text-foreground">Beijing, CN</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400">Online & Available for opportunities</span>
          </div>
        </div>
      </div>
    </TerminalCard>
  )
}
```

- [ ] **Step 8: 创建索引文件**

```typescript
// components/terminal/cards/index.ts
export { TerminalCard } from "./TerminalCard";
export { HelpCard } from "./HelpCard";
export { AboutCard } from "./AboutCard";
export { SkillsCard } from "./SkillsCard";
export { ProjectsCard } from "./ProjectsCard";
export { FocusCard } from "./FocusCard";
export { ContactCard } from "./ContactCard";
```

- [ ] **Step 9: Commit**

```bash
git add components/terminal/cards/
git commit -m "feat(terminal): add content cards (Help, About, Skills, Projects, Focus, Contact)"
```

---

## Task 6: 创建 TerminalMode 主组件

**Files:**

- Create: `components/terminal/TerminalMode.tsx`
- Modify: `app/page.tsx` (添加 TerminalMode 组件)

**目标:** 创建全屏终端模式主组件

- [ ] **Step 1: 创建 TerminalMode 组件**

```typescript
// components/terminal/TerminalMode.tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminal } from './TerminalProvider'
import {
  HelpCard,
  AboutCard,
  SkillsCard,
  ProjectsCard,
  FocusCard,
  ContactCard,
} from './cards'
import { getSuggestions } from './CommandProcessor'
import { cn } from '@/lib/utils'

const cardComponents = {
  help: HelpCard,
  about: AboutCard,
  skills: SkillsCard,
  projects: ProjectsCard,
  focus: FocusCard,
  contact: ContactCard,
}

export function TerminalMode() {
  const {
    isOpen,
    activeCard,
    input,
    output,
    setInput,
    executeCommand,
    closeTerminal,
    hideCard,
  } = useTerminal()

  const inputRef = useRef<HTMLInputElement>(null)
  const suggestions = input.trim() ? getSuggestions(input) : []

  // 全局键盘监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 按 ~ 进入终端模式
      if (e.key === '~' && !isOpen) {
        e.preventDefault()
        // 从 Provider 获取 openTerminal
        const event = new CustomEvent('open-terminal')
        window.dispatchEvent(event)
        return
      }

      if (!isOpen) return

      // ESC 处理
      if (e.key === 'Escape') {
        e.preventDefault()
        if (activeCard) {
          hideCard()
        } else {
          closeTerminal()
        }
        return
      }

      // Tab 补全
      if (e.key === 'Tab') {
        e.preventDefault()
        if (suggestions.length > 0) {
          setInput(suggestions[0].name + ' ')
        }
        return
      }

      // 自动聚焦输入框
      if (!activeCard && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, activeCard, closeTerminal, hideCard, input, setInput, suggestions])

  // 进入时聚焦
  useEffect(() => {
    if (isOpen && !activeCard) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, activeCard])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    }
  }

  // 渲染活动卡片
  const ActiveCardComponent = activeCard ? cardComponents[activeCard] : null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50"
        >
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[color-mix(in_srgb,var(--background)_85%,transparent)] backdrop-blur-xl"
            onClick={() => {
              if (activeCard) {
                hideCard()
              } else {
                closeTerminal()
              }
            }}
          />

          {/* 内容卡片区域 */}
          <AnimatePresence>
            {activeCard && ActiveCardComponent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center p-4"
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <ActiveCardComponent onClose={hideCard} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 终端输入区域 */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'absolute bottom-[20vh] left-1/2 w-[min(800px,90vw)] -translate-x-1/2',
              activeCard && 'opacity-50'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              {/* 输出区域 */}
              {output.length > 0 && (
                <div className="max-h-[40vh] space-y-2 overflow-y-auto rounded-xl border border-border/30 bg-card/30 p-4 backdrop-blur-sm">
                  {output.slice(-10).map((item, index) => (
                    <div key={index}>
                      {item.type === 'command' && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-emerald-400">
                            {'>'}
                          </span>
                          <span className="font-mono text-sm">{item.command}</span>
                        </div>
                      )}
                      {(item.type === 'output' || item.type === 'error') && (
                        <div
                          className={cn(
                            'font-mono text-sm',
                            item.type === 'error' && 'text-red-400'
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 输入区域 */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl text-emerald-400">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="输入命令..."
                  className="flex-1 border-none bg-transparent font-mono text-xl outline-none placeholder:text-muted-foreground/50"
                  autoFocus
                  aria-label="Terminal command input"
                />
                <span className="h-6 w-0.5 animate-pulse bg-primary" />
              </div>

              {/* 建议 */}
              {suggestions.length > 0 && !activeCard && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {suggestions.slice(0, 5).map((cmd) => (
                    <button
                      key={cmd.name}
                      onClick={() => executeCommand(cmd.name)}
                      className="rounded-md border border-border/50 bg-card/50 px-3 py-1.5 text-left transition-colors hover:border-primary/40 hover:bg-primary/10"
                    >
                      <span className="font-mono text-sm font-medium text-emerald-400">
                        {cmd.name}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {cmd.description}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* 提示 */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono">
                    Enter
                  </kbd>{' '}
                  执行
                </span>
                <span>
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono">
                    Tab
                  </kbd>{' '}
                  补全
                </span>
                <span>
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono">
                    ESC
                  </kbd>{' '}
                  返回
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: 更新 Provider 添加 openTerminal 事件监听**

```typescript
// 在 TerminalProvider.tsx 中添加 useEffect
useEffect(() => {
  const handleOpenEvent = () => {
    openTerminal();
  };
  window.addEventListener("open-terminal", handleOpenEvent);
  return () => window.removeEventListener("open-terminal", handleOpenEvent);
}, [openTerminal]);
```

- [ ] **Step 3: 修改 app/page.tsx 添加 TerminalMode**

```typescript
// 在 app/page.tsx 中添加
import { TerminalProvider } '@/components/terminal/TerminalProvider'
import { TerminalMode } from '@/components/terminal/TerminalMode'

// 包裹页面内容
export default function Home() {
  return (
    <TerminalProvider>
      <div className="...">
        {/* 现有内容 */}
        ...
      </div>
      <TerminalMode />
    </TerminalProvider>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/terminal/TerminalMode.tsx
# 注意：先不要修改 page.tsx，等所有组件都完成后再集成
git commit -m "feat(terminal): add TerminalMode main component with keyboard handling"
```

---

## Task 7: 更新页面集成

**Files:**

- Modify: `app/page.tsx`

**目标:** 在页面中集成 TerminalProvider 和 TerminalMode

- [ ] **Step 1: 修改 page.tsx**

```typescript
// app/page.tsx
import { StatusBar } from '@/components/layout/StatusBar'
import { TerminalWindow } from '@/components/layout/TerminalWindow'
import { HeroTerminal } from '@/components/sections/HeroTerminal'
import { SkillsMatrix } from '@/components/sections/SkillsMatrix'
import { ProjectsList } from '@/components/sections/ProjectsList'
import { FocusAreas } from '@/components/sections/FocusAreas'
import { ContactLog } from '@/components/sections/ContactLog'
import { CommandBar } from '@/components/layout/CommandBar'
import { Footer } from '@/components/layout/Footer'
import { TerminalProvider } from '@/components/terminal/TerminalProvider'
import { TerminalMode } from '@/components/terminal/TerminalMode'

export default function Home() {
  return (
    <TerminalProvider>
      <div className="bg-background text-foreground relative isolate flex min-h-svh flex-col overflow-x-clip font-sans selection:bg-blue-500/20 selection:text-blue-950 dark:selection:text-blue-100">
        {/* Background Effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(139,92,246,0.13),transparent_32%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(circle_at_center,black,transparent_75%)] bg-size-[44px_44px] opacity-55 [background:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]"
        />
        <div
          aria-hidden="true"
          className="animate-float-slow pointer-events-none absolute top-20 -right-16 -z-10 h-72 w-72 rounded-full bg-linear-to-b from-blue-500/14 to-violet-500/10 blur-3xl"
        />

        {/* Skip Link */}
        <a
          href="#main-content"
          className="bg-background text-foreground sr-only absolute top-4 left-4 z-50 rounded-md px-3 py-2 text-sm font-medium shadow-sm focus:not-sr-only focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          跳到主要内容
        </a>

        {/* Status Bar */}
        <StatusBar />

        {/* Main Content */}
        <main
          id="main-content"
          className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-12 lg:gap-6 lg:p-6"
        >
          <section id="hero" aria-label="个人介绍" className="lg:col-span-5 lg:row-span-2">
            <HeroTerminal />
          </section>

          <section id="skills" aria-label="技能列表" className="lg:col-span-3">
            <SkillsMatrix />
          </section>

          <section id="contact" aria-label="联系方式" className="lg:col-span-4">
            <ContactLog />
          </section>

          <section id="projects" aria-label="项目列表" className="lg:col-span-8">
            <ProjectsList />
          </section>

          <section id="focus" aria-label="研究方向" className="lg:col-span-4">
            <FocusAreas />
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Command Bar */}
        <CommandBar />
      </div>

      {/* Terminal Mode */}
      <TerminalMode />
    </TerminalProvider>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat(terminal): integrate TerminalProvider and TerminalMode into page"
```

---

## Task 8: 添加样式和动画优化

**Files:**

- Modify: `app/globals.css` (添加终端模式样式)

**目标:** 添加必要的 CSS 变量和动画

- [ ] **Step 1: 添加样式到 globals.css**

```css
/* 在 globals.css 末尾添加 */

/* Terminal Mode Styles */
.terminal-cursor {
  display: inline-block;
  width: 0.6em;
  height: 1.2em;
  background: var(--primary);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* Card glow animation */
@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 60px color-mix(in srgb, var(--primary) 15%, transparent);
  }
  50% {
    box-shadow: 0 0 80px color-mix(in srgb, var(--primary) 25%, transparent);
  }
}

.card-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Terminal mode transition */
.terminal-mode-enter {
  animation: terminal-enter 0.3s ease-out forwards;
}

.terminal-mode-exit {
  animation: terminal-exit 0.3s ease-in forwards;
}

@keyframes terminal-enter {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(20px);
  }
}

@keyframes terminal-exit {
  from {
    opacity: 1;
    backdrop-filter: blur(20px);
  }
  to {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "style(terminal): add terminal mode CSS animations and styles"
```

---

## Task 9: 测试和验证

**Files:**

- Test all files

**目标:** 验证功能完整性和代码质量

- [ ] **Step 1: 运行 TypeScript 检查**

```bash
npx tsc --noEmit
```

Expected: 无错误

- [ ] **Step 2: 运行 lint 检查**

```bash
npm run lint
```

Expected: 无错误

- [ ] **Step 3: 构建测试**

```bash
npm run build
```

Expected: 构建成功

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(terminal): verify build passes"
```

---

## 验收标准

### 功能验收

- [ ] 按 `~` 键进入终端模式
- [ ] 背景淡化并模糊
- [ ] 终端输入区域从底部滑入
- [ ] 输入命令并回车执行
- [ ] 内容卡片正确浮现
- [ ] ESC 键收起卡片
- [ ] 再次 ESC 退出终端模式
- [ ] `exit` 命令也能退出
- [ ] Tab 键命令补全工作
- [ ] 所有 9 个命令正常工作

### 视觉验收

- [ ] 进入动画流畅（无卡顿）
- [ ] 卡片浮现动画正确
- [ ] 毛玻璃效果正常
- [ ] 深色/浅色主题下效果一致
- [ ] 卡片发光效果正常

### 性能验收

- [ ] Lighthouse 分数 ≥ 95
- [ ] 动画 60fps
- [ ] 终端模式首次打开 < 200ms

---

## 实施顺序

1. Task 1: 类型定义
2. Task 2: 命令处理器
3. Task 3: 命令历史 Hook
4. Task 4: Terminal Provider
5. Task 5: 内容卡片组件
6. Task 6: TerminalMode 主组件
7. Task 7: 页面集成
8. Task 8: 样式优化
9. Task 9: 测试验证

---

## 注意事项

- 所有组件必须使用 `'use client'` 指令
- 键盘事件监听器需要在组件卸载时清理
- 使用 `color-mix()` CSS 函数确保主题兼容性
- 动画使用 `transform` 和 `opacity` 确保性能
- 支持 `prefers-reduced-motion` 媒体查询
