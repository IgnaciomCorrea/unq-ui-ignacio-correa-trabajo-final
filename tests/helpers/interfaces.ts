import type { UserEvent } from '@testing-library/user-event'
import type { Mock } from 'vitest'
import type { DictionaryAnswer, FetchMock } from './types.ts'

export interface PendingDictionary {
  fetchMock: FetchMock
  answer: DictionaryAnswer
}

export interface RenderedGameScreen {
  user: UserEvent
  onExit: Mock<() => void>
  onPlayAgain: Mock<() => void>
}
