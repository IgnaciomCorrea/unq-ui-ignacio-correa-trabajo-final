import { isFirstIndex, isLastIndex } from '../../shared/utils.ts'
import type { ChainLink, SlideshowState } from './interfaces.ts'
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
