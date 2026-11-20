import { getLastItem } from '../../shared/utils.ts'
import { FULL_PROGRESS, POINTS_PER_LETTER, TIMER_RING } from './constants.ts'

export function countLetters(word: string): number {
  return [...word].length
}

export function calculateWordScore(word: string): number {
  return countLetters(word) * POINTS_PER_LETTER
}

export function calculateChainScore(words: readonly string[]): number {
  return words.reduce((total, word) => total + calculateWordScore(word), 0)
}

export function getLastLetter(word: string): string | undefined {
  return getLastItem([...word])
}

export function getNextLetter(chain: readonly string[]): string | undefined {
  const lastWord = getLastItem(chain)

  return lastWord === undefined ? undefined : getLastLetter(lastWord)
}

export function getTimerDashOffset(
  remainingSeconds: number,
  totalSeconds: number,
): number {
  return TIMER_RING.circumference * (FULL_PROGRESS - remainingSeconds / totalSeconds)
}
