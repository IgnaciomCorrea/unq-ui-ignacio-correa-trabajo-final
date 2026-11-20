import { FIRST_INDEX } from '../../shared/constants.ts'
import { getLastItem } from '../../shared/utils.ts'
import {
  ACCENT_FOLDS,
  DICTIONARY_FOLDS,
  FULL_PROGRESS,
  LOW_TIME_THRESHOLD_SECONDS,
  MS_PER_SECOND,
  NO_TIME_LEFT,
  POINTS_PER_LETTER,
  SPANISH_LOCALE,
  TIMER_RING,
  WORD_PATTERN,
} from './constants.ts'
import type { LocalRejectionReason } from './types.ts'

export function countLetters(word: string): number {
  return [...word].length
}

export function calculateWordScore(word: string): number {
  return countLetters(word) * POINTS_PER_LETTER
}

export function calculateChainScore(words: readonly string[]): number {
  return words.reduce((total, word) => total + calculateWordScore(word), 0)
}

export function normalizeWord(rawWord: string): string {
  return rawWord.trim().normalize('NFC').toLocaleLowerCase(SPANISH_LOCALE)
}

function foldLetters(
  word: string,
  folds: Readonly<Record<string, string>>,
): string {
  return [...word].map((letter) => folds[letter] ?? letter).join('')
}

export function toComparableWord(word: string): string {
  return foldLetters(word, ACCENT_FOLDS)
}

export function toDictionaryWord(word: string): string {
  return foldLetters(word, DICTIONARY_FOLDS)
}

function getFirstLetter(word: string): string | undefined {
  return [...word].at(FIRST_INDEX)
}

function getLastLetter(word: string): string | undefined {
  return getLastItem([...word])
}

export function getNextLetter(chain: readonly string[]): string | undefined {
  const lastWord = getLastItem(chain)

  return lastWord === undefined
    ? undefined
    : getLastLetter(toComparableWord(lastWord))
}

function isWordUsed(word: string, chain: readonly string[]): boolean {
  const comparableWord = toComparableWord(word)

  return chain.some((usedWord) => toComparableWord(usedWord) === comparableWord)
}

function breaksChain(word: string, chain: readonly string[]): boolean {
  const nextLetter = getNextLetter(chain)

  return (
    nextLetter !== undefined &&
    getFirstLetter(toComparableWord(word)) !== nextLetter
  )
}

export function findLocalRejection(
  word: string,
  chain: readonly string[],
): LocalRejectionReason | undefined {
  if (word === '') {
    return 'empty'
  }

  if (!WORD_PATTERN.test(word)) {
    return 'invalidFormat'
  }

  if (isWordUsed(word, chain)) {
    return 'alreadyUsed'
  }

  if (breaksChain(word, chain)) {
    return 'brokenChain'
  }

  return undefined
}

export function getRemainingSeconds(deadline: number, now: number): number {
  return Math.max(NO_TIME_LEFT, Math.ceil((deadline - now) / MS_PER_SECOND))
}

export function isTimeUp(remainingSeconds: number): boolean {
  return remainingSeconds === NO_TIME_LEFT
}

export function isLowTime(remainingSeconds: number): boolean {
  return (
    !isTimeUp(remainingSeconds) &&
    remainingSeconds <= LOW_TIME_THRESHOLD_SECONDS
  )
}

export function getTimerDashOffset(
  remainingSeconds: number,
  totalSeconds: number,
): number {
  return TIMER_RING.circumference * (FULL_PROGRESS - remainingSeconds / totalSeconds)
}
