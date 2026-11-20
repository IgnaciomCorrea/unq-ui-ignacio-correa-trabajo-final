import type { ComponentPropsWithRef } from 'react'
import type { ArrowDirection, ButtonSize, ButtonVariant } from './types.ts'

export interface ButtonProps
  extends Omit<ComponentPropsWithRef<'button'>, 'className'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export interface ArrowIconProps {
  direction: ArrowDirection
}
