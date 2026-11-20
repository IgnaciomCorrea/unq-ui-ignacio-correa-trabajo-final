import type { BackHomeButtonProps } from '../interfaces.ts'
import { ArrowIcon } from './ArrowIcon.tsx'
import { Button } from './Button.tsx'

export function BackHomeButton({ onClick }: BackHomeButtonProps) {
  return (
    <div>
      <Button variant="ghost" size="compact" onClick={onClick}>
        <ArrowIcon direction="left" />
        Volver al inicio
      </Button>
    </div>
  )
}
