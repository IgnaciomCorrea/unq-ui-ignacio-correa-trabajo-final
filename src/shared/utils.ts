import {
  FIRST_INDEX,
  FIRST_POSITION,
  INDEX_STEP,
  LAST_ITEM_INDEX,
} from './constants.ts'
import type { ZodError } from 'zod'
import type { LetterTile } from './interfaces.ts'

export function getCyclicItem<Item>(items: readonly Item[], index: number): Item {
  return items[index % items.length]
}

export function shuffle<Item>(items: readonly Item[]): Item[] {
  return items
    .map((item) => ({ item, sortKey: Math.random() }))
    .sort((first, second) => first.sortKey - second.sortKey)
    .map(({ item }) => item)
}

export function getLastItem<Item>(items: readonly Item[]): Item | undefined {
  return items.at(LAST_ITEM_INDEX)
}

export function getFirstIssueMessage(error: ZodError): string | undefined {
  return error.issues.at(FIRST_INDEX)?.message
}

export function isFirstIndex(index: number): boolean {
  return index === FIRST_INDEX
}

export function isLastIndex(index: number, length: number): boolean {
  return index === length - INDEX_STEP
}

export function indexToPosition(index: number): number {
  return index + FIRST_POSITION
}

export function positionToIndex(position: number): number {
  return position - FIRST_POSITION
}

export function buildLetterTiles(
  word: string,
  highlightFirst: boolean,
  highlightLast: boolean,
): LetterTile[] {
  const letters = [...word]

  return letters.map((letter, index): LetterTile => {
    const isHighlighted =
      (highlightFirst && isFirstIndex(index)) ||
      (highlightLast && isLastIndex(index, letters.length))

    return { letter, tone: isHighlighted ? 'primary' : 'neutral' }
  })
}
