export type CardType = 'help' | 'about' | 'skills' | 'projects' | 'focus' | 'contact' | null

export interface Command {
  name: string
  aliases: string[]
  description: string
  handler: (args?: string) => CommandResult
}

export interface CommandResult {
  type: 'text' | 'card' | 'action'
  content?: string
  cardType?: CardType
  action?: () => void
}

export interface TerminalState {
  isOpen: boolean
  input: string
  output: OutputItem[]
  history: string[]
  historyIndex: number
  activeCard: CardType
}

export interface OutputItem {
  command: string
  timestamp: number
  type: 'command' | 'output' | 'error'
  content?: string
}

export interface TerminalContextType {
  isOpen: boolean
  activeCard: CardType
  input: string
  output: OutputItem[]
  openTerminal: () => void
  closeTerminal: () => void
  setInput: (input: string) => void
  executeCommand: (command: string) => void
  showCard: (cardType: CardType) => void
  hideCard: () => void
  goBack: () => void
}
