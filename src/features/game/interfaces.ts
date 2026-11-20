export interface GameScreenProps {
  playerName: string
  chain: readonly string[]
  remainingSeconds: number
  draftWord: string
  feedback: string | undefined
}

export interface GameHeaderProps {
  playerName: string
  score: number
  wordCount: number
}

export interface GameStatProps {
  label: string
  value: number
}

export interface TurnTimerProps {
  remainingSeconds: number
}

export interface NextLetterHintProps {
  letter: string | undefined
}

export interface WordFormProps {
  draftWord: string
  feedback: string | undefined
}

export interface WordChainProps {
  words: readonly string[]
}

export interface ChainWordProps {
  word: string
  isFirst: boolean
  isNewest: boolean
}
