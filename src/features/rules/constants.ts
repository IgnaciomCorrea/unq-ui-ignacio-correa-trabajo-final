import type { ExampleChain, ForwardAction, SlideDirection } from './types.ts'

export const EXAMPLE_CHAINS: readonly ExampleChain[] = [
  ['casa', 'árbol', 'luna'],
  ['pera', 'águila', 'arroz'],
  ['mesa', 'ángel', 'lago'],
  ['tomate', 'éxito', 'oso'],
  ['gato', 'ópera', 'agua'],
]

export const INITIAL_SLIDE_DIRECTION: SlideDirection = 'forward'

export const SLIDE_ANIMATION_CLASSES: Record<SlideDirection, string> = {
  forward: 'motion-safe:animate-slide-in-forward',
  backward: 'motion-safe:animate-slide-in-backward',
}

export const PROGRESS_DOT_CLASSES = {
  active: 'w-6 bg-primary',
  inactive: 'w-2 bg-border-strong',
} as const

const FORWARD_SLOT_BASE_CLASSES =
  'relative ml-auto flex flex-1 rounded-2xl *:flex-1 sm:flex-none'

export const FORWARD_SLOT_CLASSES: Record<ForwardAction, string> = {
  next: FORWARD_SLOT_BASE_CLASSES,
  start: `${FORWARD_SLOT_BASE_CLASSES} motion-safe:animate-cta-pop after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:opacity-0 motion-safe:after:animate-cta-ring`,
}
