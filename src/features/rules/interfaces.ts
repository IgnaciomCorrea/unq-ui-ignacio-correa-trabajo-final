import type { ReactNode } from 'react'
import type { TileTone } from '../../shared/types.ts'
import type { ExampleChain, SlideDirection } from './types.ts'

export interface SlideshowState {
  index: number
  direction: SlideDirection
  slideCount: number
}

export interface Slideshow {
  index: number
  direction: SlideDirection
  isFirst: boolean
  isLast: boolean
  goToNext: () => void
  goToPrevious: () => void
}

export interface LetterTile {
  letter: string
  tone: TileTone
}

export interface ChainLink {
  from: string
  to: string
}

export interface RulesScreenProps {
  onBackHome: () => void
}

export interface RuleSlideContentProps {
  exampleChain: ExampleChain
}

export interface RuleSlideProps {
  title: string
  illustration?: ReactNode
  children: ReactNode
}

export interface SlideControlsProps {
  isFirst: boolean
  isLast: boolean
  onPrevious: () => void
  onNext: () => void
}

export interface SlideProgressProps {
  count: number
  currentIndex: number
}

export interface ExampleWordProps {
  word: string
  highlightFirst?: boolean
  highlightLast?: boolean
}

export interface ExampleWordListProps {
  words: readonly string[]
}
