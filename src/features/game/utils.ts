import { POINTS_PER_LETTER } from './constants.ts'

export function countLetters(word: string): number {
  return [...word].length
}

export function calculateWordScore(word: string): number {
  return countLetters(word) * POINTS_PER_LETTER
}

export function calculateChainScore(words: readonly string[]): number {
  return words.reduce((total, word) => total + calculateWordScore(word), 0)
}
