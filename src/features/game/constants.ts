import type { SweetAlertCustomClass } from 'sweetalert2'
import type { TileTone } from '../../shared/types.ts'
import { getButtonClasses } from '../../shared/utils.ts'
import type { TimerToneClasses } from './interfaces.ts'
import type { TimerTone } from './types.ts'

export const TURN_DURATION_SECONDS = 15

export const FIRST_GAME_ROUND = 0

export const GAME_ROUND_STEP = 1

export const MS_PER_SECOND = 1000

export const TURN_DURATION_MS = TURN_DURATION_SECONDS * MS_PER_SECOND

export const NO_TIME_LEFT = 0

export const LOW_TIME_THRESHOLD_SECONDS = 5

export const TIMER_TICK_MS = 250

export const POINTS_PER_LETTER = 1

export const SINGLE_POINT = 1

export const FEEDBACK_ID_STEP = 1

export const INITIAL_FEEDBACK_COUNT = 0

export const FULL_PROGRESS = 1

export const SPANISH_LOCALE = 'es'

export const WORD_PATTERN = /^[a-záéíóúüñ]+$/u

export const ACCENT_FOLDS: Readonly<Record<string, string>> = {
  á: 'a',
  é: 'e',
  í: 'i',
  ó: 'o',
  ú: 'u',
  ü: 'u',
}

export const DICTIONARY_FOLDS: Readonly<Record<string, string>> = {
  ...ACCENT_FOLDS,
  ñ: 'n',
}

export const WORD_VALIDATION_ENDPOINT = new URL(
  import.meta.env.VITE_ROUTE_WORD_VALIDATION,
  import.meta.env.VITE_URL_API,
).href

export const WORD_QUERY_PARAM = 'word'

export const DICTIONARY_TIMEOUT_MS = 8000

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

export const TIMER_TONE_CLASSES: Record<TimerTone, TimerToneClasses> = {
  normal: { container: '', value: 'text-foreground', label: 'text-muted' },
  low: {
    container: 'motion-safe:animate-timer-pulse',
    value: 'text-primary-text',
    label: 'text-primary-text',
  },
}

export const INPUT_SHAKE_CLASSES = 'motion-safe:animate-input-shake'

export const ABANDON_DIALOG_CLASSES: SweetAlertCustomClass = {
  actions: 'gap-3',
  confirmButton: getButtonClasses('secondary', 'regular'),
  cancelButton: getButtonClasses('primary', 'regular'),
}

export const ABANDON_DIALOG_ICON_COLOR = 'var(--color-error-border)'

export const CHAIN_WORD_CLASSES = {
  newest: 'border-primary',
  previous: 'border-border-strong',
} as const

export const LETTER_TONE_TEXT_CLASSES: Record<TileTone, string> = {
  neutral: 'text-foreground',
  primary: 'font-bold text-primary-text',
}
