import type {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  ReactNode,
  RefObject,
} from 'react'
import type {
  DictionaryResult,
  GameStatus,
  RejectionReason,
  WordFeedback,
  WordOutcome,
} from './types.ts'

export interface AcceptedWordFeedback {
  id: number
  kind: 'accepted'
  word: string
  points: number
}

export interface RejectedWordFeedback {
  id: number
  kind: 'rejected'
  word: string
  reason: RejectionReason
}

export interface ScoreGain {
  id: number
  points: number
}

export interface GameState {
  status: GameStatus
  chain: string[]
  turnDeadline: number | undefined
  remainingSeconds: number
  pendingWord: string | undefined
  feedback: WordFeedback | undefined
  lastGain: ScoreGain | undefined
  feedbackCount: number
}

export interface Game {
  status: GameStatus
  chain: readonly string[]
  score: number
  nextLetter: string | undefined
  remainingSeconds: number
  pendingWord: string | undefined
  feedback: WordFeedback | undefined
  lastGain: ScoreGain | undefined
  submitWord: (rawWord: string) => Promise<WordOutcome>
}

export interface TimerToneClasses {
  container: string
  value: string
  label: string
}

export interface DictionaryCheck {
  isChecking: () => boolean
  check: (word: string) => Promise<DictionaryResult>
}

export interface WordFormState {
  draftWord: string
  isShaking: boolean
  handleDraftChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void
  handleShakeEnd: () => void
}

export interface GameScreenProps {
  playerName: string
  onExit: () => void
  onPlayAgain: () => void
}

export interface AbandonGameButtonProps {
  onClick: () => void
}

export interface GameHeaderProps {
  playerName: string
  score: number
  wordCount: number
  lastGain: ScoreGain | undefined
}

export interface GameStatProps {
  label: string
  value: number
  children?: ReactNode
}

export interface ScoreGainBadgeProps {
  points: number
}

export interface TurnTimerProps {
  remainingSeconds: number
  isRunning: boolean
}

export interface NextLetterHintProps {
  letter: string | undefined
}

export interface WordFormProps {
  inputRef: RefObject<HTMLInputElement | null>
  status: GameStatus
  pendingWord: string | undefined
  feedback: WordFeedback | undefined
  nextLetter: string | undefined
  onSubmitWord: (rawWord: string) => Promise<WordOutcome>
}

export interface TurnMessageProps {
  isOver: boolean
  pendingWord: string | undefined
  feedback: WordFeedback | undefined
  nextLetter: string | undefined
}

export interface RejectionTextProps {
  feedback: RejectedWordFeedback
  nextLetter: string | undefined
}

export interface WordChainProps {
  words: readonly string[]
}

export interface ChainWordProps {
  word: string
  isFirst: boolean
  isNewest: boolean
}
