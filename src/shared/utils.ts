import { FIRST_INDEX, FIRST_POSITION, INDEX_STEP } from './constants.ts'

export function getCyclicItem<Item>(items: readonly Item[], index: number): Item {
  return items[index % items.length]
}

export function shuffle<Item>(items: readonly Item[]): Item[] {
  return items
    .map((item) => ({ item, sortKey: Math.random() }))
    .sort((first, second) => first.sortKey - second.sortKey)
    .map(({ item }) => item)
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
