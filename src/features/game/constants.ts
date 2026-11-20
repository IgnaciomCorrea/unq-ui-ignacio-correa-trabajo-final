import type { TileTone } from '../../shared/types.ts'

export const TURN_DURATION_SECONDS = 15

export const POINTS_PER_LETTER = 1

export const FULL_PROGRESS = 1

const TIMER_RING_SIZE = 120

const TIMER_RING_STROKE_WIDTH = 10

const TIMER_RING_DIAMETER = TIMER_RING_SIZE - TIMER_RING_STROKE_WIDTH

export const TIMER_RING = {
  viewBox: `0 0 ${TIMER_RING_SIZE} ${TIMER_RING_SIZE}`,
  center: TIMER_RING_SIZE / 2,
  radius: TIMER_RING_DIAMETER / 2,
  strokeWidth: TIMER_RING_STROKE_WIDTH,
  circumference: Math.PI * TIMER_RING_DIAMETER,
} as const

export const CHAIN_WORD_CLASSES = {
  newest: 'border-primary',
  previous: 'border-border-strong',
} as const

export const LETTER_TONE_TEXT_CLASSES: Record<TileTone, string> = {
  neutral: 'text-foreground',
  primary: 'font-bold text-primary-text',
}
