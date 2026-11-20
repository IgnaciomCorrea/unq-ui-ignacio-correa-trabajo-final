import { useId } from 'react'
import { LEADERBOARD_POSITIONS } from '../constants.ts'
import type { LeaderboardProps } from '../interfaces.ts'
import { getEntryAtPosition } from '../utils.ts'
import { LeaderboardSlot } from './LeaderboardSlot.tsx'

export function Leaderboard({ entries }: LeaderboardProps) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
    >
      <h2 id={titleId} className="text-lg font-bold">
        Mejores puntajes
      </h2>
      <ol className="mt-3 divide-y divide-border">
        {LEADERBOARD_POSITIONS.map((position) => (
          <LeaderboardSlot
            key={position}
            position={position}
            entry={getEntryAtPosition(entries, position)}
          />
        ))}
      </ol>
    </section>
  )
}
