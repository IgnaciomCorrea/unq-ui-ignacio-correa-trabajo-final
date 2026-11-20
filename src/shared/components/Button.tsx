import type { ButtonProps } from '../interfaces.ts'
import { getButtonClasses } from '../utils.ts'

export function Button({
  variant = 'primary',
  size = 'regular',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={getButtonClasses(variant, size)} {...props} />
  )
}
