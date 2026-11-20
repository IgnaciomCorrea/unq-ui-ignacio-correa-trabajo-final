import { FIRST_INDEX, INDEX_STEP } from '../../shared/constants.ts'
import { INITIAL_SLIDE_DIRECTION } from './constants.ts'
import type { SlideshowState } from './interfaces.ts'
import type { SlideshowAction } from './types.ts'
import { isFirstSlide, isLastSlide } from './utils.ts'

export function createSlideshowState(slideCount: number): SlideshowState {
  return {
    index: FIRST_INDEX,
    direction: INITIAL_SLIDE_DIRECTION,
    slideCount,
  }
}

export function slideshowReducer(
  state: SlideshowState,
  action: SlideshowAction,
): SlideshowState {
  switch (action.type) {
    case 'next':
      return isLastSlide(state)
        ? state
        : { ...state, index: state.index + INDEX_STEP, direction: 'forward' }
    case 'previous':
      return isFirstSlide(state)
        ? state
        : { ...state, index: state.index - INDEX_STEP, direction: 'backward' }
  }
}
