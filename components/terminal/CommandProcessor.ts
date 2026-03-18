import type { Command, CommandResult, CardType } from '@/types/terminal'

const commands: Command[] = [
  {
    name: 'help',
    aliases: ['?', 'h'],
    description: '显示所有可用命令',
    handler: () => ({
      type: 'card',
      cardType: 'help' as CardType,
    }),
  },
  {
    name: 'about',
    aliases: ['whoami'],
    description: '查看个人介绍',
    handler: () => ({
      type: 'card',
      cardType: 'about' as CardType,
    }),
  },
  {
    name: 'skills',
    aliases: ['tech', 'stack'],
    description: '查看技能矩阵',
    handler: () => ({
      type: 'card',
      cardType: 'skills' as CardType,
    }),
  },
  {
    name: 'projects',
    aliases: ['ls', 'work'],
    description: '查看项目列表',
    handler: () => ({
      type: 'card',
      cardType: 'projects' as CardType,
    }),
  },
  {
    name: 'focus',
    aliases: ['research'],
    description: '查看研究方向',
    handler: () => ({
      type: 'card',
      cardType: 'focus' as CardType,
    }),
  },
  {
    name: 'contact',
    aliases: ['reach'],
    description: '查看联系方式',
    handler: () => ({
      type: 'card',
      cardType: 'contact' as CardType,
    }),
  },
  {
    name: 'theme',
    aliases: [],
    description: '切换主题',
    handler: (args) => ({
      type: 'action',
      action: () => {
        const event = new MouseEvent('click')
        const button = document.querySelector('[aria-label="切换主题"]') as HTMLButtonElement
        button?.dispatchEvent(event)
      },
      content: args ? `切换到 ${args} 主题` : '主题已切换',
    }),
  },
  {
    name: 'clear',
    aliases: ['cls'],
    description: '清屏',
    handler: () => ({
      type: 'action',
      content: '屏幕已清空',
    }),
  },
  {
    name: 'exit',
    aliases: ['quit', 'q'],
    description: '退出终端模式',
    handler: () => ({
      type: 'action',
      content: '正在退出...',
    }),
  },
]

export function findCommand(input: string): Command | undefined {
  const lowerInput = input.toLowerCase().trim()
  const parts = lowerInput.split(/\s+/)
  const cmdName = parts[0]

  return commands.find(
    (cmd) =>
      cmd.name === cmdName || cmd.aliases.includes(cmdName)
  )
}

export function getCommandList(): Command[] {
  return commands
}

export function processCommand(input: string): CommandResult {
  const trimmed = input.trim()
  if (!trimmed) {
    return { type: 'text', content: '' }
  }

  const parts = trimmed.split(/\s+/)
  const cmdName = parts[0]
  const args = parts.slice(1).join(' ')

  const cmd = findCommand(cmdName)

  if (!cmd) {
    return {
      type: 'text',
      content: `命令不存在：${cmdName}\n输入 'help' 查看可用命令`,
    }
  }

  return cmd.handler(args)
}

export function getSuggestions(input: string): Command[] {
  const lowerInput = input.toLowerCase().trim()
  if (!lowerInput) return []

  return commands.filter(
    (cmd) =>
      cmd.name.startsWith(lowerInput) ||
      cmd.aliases.some((alias) => alias.startsWith(lowerInput))
  )
}
