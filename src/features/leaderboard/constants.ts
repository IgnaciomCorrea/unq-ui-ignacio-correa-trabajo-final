import type { MedalStyle } from './interfaces.ts'
import type { MedalKind } from './types.ts'

export const LEADERBOARD_SIZE = 10

export const FIRST_POSITION = 1

export const LEADERBOARD_POSITIONS = Array.from(
  { length: LEADERBOARD_SIZE },
  (_, index) => FIRST_POSITION + index,
)

export const SINGLE_WORD_COUNT = 1

export const PODIUM_MEDALS: readonly MedalKind[] = ['gold', 'silver', 'bronze']

export const MEDAL_STYLES: Record<MedalKind, MedalStyle> = {
  gold: {
    body: 'fill-medal-gold stroke-medal-gold-dark',
    number: 'fill-medal-gold-dark',
    label: 'oro',
  },
  silver: {
    body: 'fill-medal-silver stroke-medal-silver-dark',
    number: 'fill-medal-silver-dark',
    label: 'plata',
  },
  bronze: {
    body: 'fill-medal-bronze stroke-medal-bronze-dark',
    number: 'fill-medal-bronze-dark',
    label: 'bronce',
  },
}

const MEDAL_WIDTH = 32

const MEDAL_HEIGHT = 40

const MEDAL_RADIUS = 11

const MEDAL_STROKE_WIDTH = 2

export const MEDAL_SVG = {
  viewBox: `0 0 ${MEDAL_WIDTH} ${MEDAL_HEIGHT}`,
  centerX: MEDAL_WIDTH / 2,
  centerY: MEDAL_HEIGHT - MEDAL_RADIUS - MEDAL_STROKE_WIDTH,
  radius: MEDAL_RADIUS,
  strokeWidth: MEDAL_STROKE_WIDTH,
  leftRibbonPath: 'M6 0h7l6 17h-7z',
  rightRibbonPath: 'M26 0h-7l-6 17h7z',
} as const
