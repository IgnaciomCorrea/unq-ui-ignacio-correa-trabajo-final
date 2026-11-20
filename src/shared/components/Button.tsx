import { BUTTON_BASE_CLASSES, BUTTON_VARIANT_CLASSES } from '../constants.ts'
import type { ButtonProps } from '../interfaces.ts'

export function Button({
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]}`}
      {...props}
    />
  )
}
