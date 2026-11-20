import type { ComponentType } from 'react'
import type { RuleSlideContentProps } from '../../interfaces.ts'
import { ChainSlide } from './ChainSlide.tsx'
import { ObjectiveSlide } from './ObjectiveSlide.tsx'
import { ReadySlide } from './ReadySlide.tsx'
import { ScoreSlide } from './ScoreSlide.tsx'
import { TimerSlide } from './TimerSlide.tsx'
import { ValidWordsSlide } from './ValidWordsSlide.tsx'

export const RULE_SLIDES: readonly ComponentType<RuleSlideContentProps>[] = [
  ObjectiveSlide,
  ChainSlide,
  ValidWordsSlide,
  ScoreSlide,
  TimerSlide,
  ReadySlide,
]
