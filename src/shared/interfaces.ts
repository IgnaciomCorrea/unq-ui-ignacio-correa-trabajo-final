import type { ComponentPropsWithRef } from 'react'
import type {
  ArrowDirection,
  ButtonSize,
  ButtonVariant,
  TileTone,
} from './types.ts'

export interface ButtonProps
  extends Omit<ComponentPropsWithRef<'button'>, 'className'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export interface ArrowIconProps {
  direction: ArrowDirection
}

export interface LetterTile {
  letter: string
  tone: TileTone
}

export interface FeedbackMessageProps {
  id: string
  message: string
}

export interface BackHomeButtonProps {
  onClick: () => void
}
