import { TILE_TONE_CLASSES } from '../../../shared/constants.ts'
import type { NextLetterHintProps } from '../interfaces.ts'

export function NextLetterHint({ letter }: NextLetterHintProps) {
  if (letter === undefined) {
    return (
      <p className="text-center text-lg font-semibold text-muted">
        Escribí cualquier palabra para empezar
      </p>
    )
  }

  return (
    <p className="flex flex-wrap items-center justify-center gap-3 text-center text-lg font-semibold text-muted">
      La próxima palabra empieza con
      <span
        className={`grid size-14 place-items-center rounded-xl border-2 text-3xl font-bold uppercase leading-none ${TILE_TONE_CLASSES.primary}`}
      >
        {letter}
      </span>
    </p>
  )
}
