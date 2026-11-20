import { isFirstIndex, isLastIndex } from '../../shared/utils.ts'
import type { ChainLink, LetterTile, SlideshowState } from './interfaces.ts'
import type { ExampleChain } from './types.ts'

export function isFirstSlide(state: SlideshowState): boolean {
  return isFirstIndex(state.index)
}

export function isLastSlide(state: SlideshowState): boolean {
  return isLastIndex(state.index, state.slideCount)
}

export function getChainLink([from, to]: ExampleChain): ChainLink {
  return { from, to }
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
