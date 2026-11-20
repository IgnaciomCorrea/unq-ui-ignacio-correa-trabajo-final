export type SlideDirection = 'forward' | 'backward'

export type SlideshowAction = { type: 'next' } | { type: 'previous' }

export type ForwardAction = 'next' | 'start'

export type ExampleChain = readonly [string, string, string]
