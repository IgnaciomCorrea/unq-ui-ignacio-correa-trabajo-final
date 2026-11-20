import { ArrowIcon } from '../../../shared/components/ArrowIcon.tsx'
import { Button } from '../../../shared/components/Button.tsx'
import type { AbandonGameButtonProps } from '../interfaces.ts'

export function AbandonGameButton({ onClick }: AbandonGameButtonProps) {
  return (
    <div>
      <Button variant="ghost" size="compact" onClick={onClick}>
        <ArrowIcon direction="left" />
        Abandonar partida
      </Button>
    </div>
  )
}
