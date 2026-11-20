import { SINGLE_WORD_COUNT } from '../constants.ts'
import type { PlayerResultProps } from '../interfaces.ts'

export function PlayerResult({ entry }: PlayerResultProps) {
  const isSingleWord = entry.wordCount === SINGLE_WORD_COUNT

  return (
    <>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium" title={entry.playerName}>
          {entry.playerName}
        </p>
        <p className="text-sm text-muted">
          {entry.wordCount} {isSingleWord ? 'palabra' : 'palabras'}
        </p>
      </div>
      <p className="shrink-0 text-right font-bold tabular-nums">
        {entry.score}
        <span aria-hidden="true" className="ml-1 text-sm font-medium text-muted">
          pts
        </span>
        <span className="sr-only"> puntos</span>
      </p>
    </>
  )
}
