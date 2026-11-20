import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { ArrowIcon } from '../../../shared/components/ArrowIcon.tsx'
import { Button } from '../../../shared/components/Button.tsx'
import { PlayIcon } from '../../../shared/components/PlayIcon.tsx'
import { FORWARD_SLOT_CLASSES } from '../constants.ts'
import type { SlideControlsProps } from '../interfaces.ts'
import type { ForwardAction } from '../types.ts'

export function SlideControls({
  isFirst,
  isLast,
  onPrevious,
  onNext,
  onStart,
}: SlideControlsProps) {
  const previousButtonRef = useRef<HTMLButtonElement>(null)
  const forwardButtonRef = useRef<HTMLButtonElement>(null)
  const forwardAction: ForwardAction = isLast ? 'start' : 'next'

  function handlePrevious() {
    flushSync(onPrevious)

    if (!previousButtonRef.current) {
      forwardButtonRef.current?.focus()
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {!isFirst && (
        <Button
          ref={previousButtonRef}
          variant="secondary"
          onClick={handlePrevious}
        >
          <ArrowIcon direction="left" />
          <span className="sr-only sm:not-sr-only">Anterior</span>
        </Button>
      )}
      <span className={FORWARD_SLOT_CLASSES[forwardAction]}>
        {isLast ? (
          <Button ref={forwardButtonRef} size="large" onClick={onStart}>
            Iniciar partida
            <PlayIcon />
          </Button>
        ) : (
          <Button ref={forwardButtonRef} onClick={onNext}>
            Siguiente
            <ArrowIcon direction="right" />
          </Button>
        )}
      </span>
    </div>
  )
}
