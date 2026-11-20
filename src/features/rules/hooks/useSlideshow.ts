import { useReducer } from 'react'
import type { Slideshow } from '../interfaces.ts'
import { createSlideshowState, slideshowReducer } from '../reducer.ts'
import { isFirstSlide, isLastSlide } from '../utils.ts'

export function useSlideshow(slideCount: number): Slideshow {
  const [state, dispatch] = useReducer(
    slideshowReducer,
    slideCount,
    createSlideshowState,
  )

  return {
    index: state.index,
    direction: state.direction,
    isFirst: isFirstSlide(state),
    isLast: isLastSlide(state),
    goToNext: () => dispatch({ type: 'next' }),
    goToPrevious: () => dispatch({ type: 'previous' }),
  }
}
