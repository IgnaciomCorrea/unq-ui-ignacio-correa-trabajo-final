import type { ButtonHTMLAttributes } from 'react'
import type { ButtonVariant } from './types.ts'

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant
}
