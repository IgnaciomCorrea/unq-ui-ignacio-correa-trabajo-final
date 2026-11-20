import type { ButtonVariant } from './types.ts'

export const BUTTON_BASE_CLASSES =
  'inline-flex min-h-14 items-center justify-center rounded-2xl px-8 text-lg font-bold uppercase transition duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring active:translate-y-(--edge-depth) active:shadow-none disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none'

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground edge-primary hover:bg-primary-hover',
  secondary:
    'border-2 border-border-strong bg-surface text-primary-text edge-neutral hover:bg-surface-hover',
}
