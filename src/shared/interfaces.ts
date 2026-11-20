import type { ComponentPropsWithRef, ReactNode } from 'react'
import type {
  ArrowDirection,
  ButtonSize,
  ButtonVariant,
  FeedbackTone,
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
  id?: string
  tone: FeedbackTone
  children: ReactNode
}

export interface FeedbackIconProps {
  tone: FeedbackTone
}

export interface BackHomeButtonProps {
  onClick: () => void
}
