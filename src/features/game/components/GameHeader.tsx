import type { GameHeaderProps } from '../interfaces.ts'
import { GameStat } from './GameStat.tsx'

export function GameHeader({ playerName, score, wordCount }: GameHeaderProps) {
  return (
    <header className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase text-muted">Jugador</p>
        <p className="truncate text-2xl font-bold" title={playerName}>
          {playerName}
        </p>
      </div>
      <dl className="flex shrink-0 gap-3">
        <GameStat label="Puntaje" value={score} />
        <GameStat label="Palabras" value={wordCount} />
      </dl>
    </header>
  )
}
