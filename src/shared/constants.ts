import type { AriaRole } from 'react'
import type {
  ArrowDirection,
  ButtonSize,
  ButtonVariant,
  FeedbackTone,
  TileTone,
} from './types.ts'

export const FIRST_INDEX = 0

export const INDEX_STEP = 1

export const LAST_ITEM_INDEX = -1

export const FIRST_POSITION = 1

export const PROGRAMMATIC_FOCUS_TAB_INDEX = -1

export const BUTTON_BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-bold transition duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none'

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  compact: 'min-h-11 px-4 text-base',
  regular: 'min-h-14 px-6 text-lg uppercase',
  large: 'min-h-16 px-6 text-lg uppercase sm:px-8 sm:text-xl',
}

const PRESSABLE_CLASSES = 'active:translate-y-(--edge-depth) active:shadow-none'

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: `bg-primary text-primary-foreground edge-primary hover:bg-primary-hover ${PRESSABLE_CLASSES}`,
  secondary: `border-2 border-border-strong bg-surface text-primary-text edge-neutral hover:bg-surface-hover ${PRESSABLE_CLASSES}`,
  ghost: 'text-muted hover:bg-surface-hover hover:text-foreground',
}

export const TEXT_INPUT_CLASSES =
  'min-h-14 w-full min-w-0 flex-1 rounded-2xl border-2 border-border-strong bg-background px-4 text-xl font-semibold text-foreground outline-none transition-colors placeholder:font-normal placeholder:text-muted focus:border-ring focus:ring-4 focus:ring-ring/25 aria-invalid:border-error-border motion-reduce:transition-none'

export const TILE_TONE_CLASSES: Record<TileTone, string> = {
  neutral: 'border-border-strong bg-surface text-foreground tile-edge-neutral',
  primary: 'border-primary bg-primary text-primary-foreground tile-edge-primary',
}

export const ICON_VIEW_BOX = '0 0 24 24'

export const ICON_STROKE_WIDTH = 2.5

export const ARROW_PATHS: Record<ArrowDirection, string> = {
  left: 'M19 12H5m6-6-6 6 6 6',
  right: 'M5 12h14m-6-6 6 6-6 6',
}

export const PLAY_PATH = 'M8 5.5v13l10-6.5z'

export const ALERT_PATH = 'M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'

export const CHECK_PATH = 'M5 12.5l4.5 4.5L19 7'

export const SPINNER_PATH = 'M21 12a9 9 0 1 1-9-9'

export const FEEDBACK_TONE_CLASSES: Record<FeedbackTone, string> = {
  error: 'border-error-border bg-error-surface text-error',
  success: 'border-success-border bg-success-surface text-success',
  neutral: 'border-border-strong bg-background text-muted',
}

export const FEEDBACK_ROLES: Record<FeedbackTone, AriaRole> = {
  error: 'alert',
  success: 'status',
  neutral: 'status',
}
