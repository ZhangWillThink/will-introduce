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
import { processCommand } from './CommandProcessor'
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
