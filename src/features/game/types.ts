import type { AcceptedWordFeedback, RejectedWordFeedback } from './interfaces.ts'

export type GameStatus = 'ready' | 'playing' | 'over'

export type LocalRejectionReason =
  | 'empty'
  | 'invalidFormat'
  | 'alreadyUsed'
  | 'brokenChain'

export type RejectionReason = LocalRejectionReason | 'notInDictionary' | 'unavailable'

export type WordFeedback = AcceptedWordFeedback | RejectedWordFeedback

export type DictionaryResult = 'found' | 'missing' | 'unavailable' | 'cancelled'

export type WordOutcome = 'accepted' | 'rejected' | 'ignored'

export type TimerTone = 'normal' | 'low'

export type GameAction =
  | { type: 'validationStarted'; word: string }
  | { type: 'wordAccepted'; word: string; now: number }
  | { type: 'wordRejected'; word: string; reason: RejectionReason }
  | { type: 'tick'; now: number }
