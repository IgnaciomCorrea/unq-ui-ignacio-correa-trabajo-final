import type { LeaderboardSlotProps } from '../interfaces.ts'
import { PlayerResult } from './PlayerResult.tsx'
import { RankBadge } from './RankBadge.tsx'

export function LeaderboardSlot({ position, entry }: LeaderboardSlotProps) {
  return (
    <li className="flex min-h-15 items-center gap-3 py-2">
      <RankBadge position={position} withMedal={entry !== undefined} />
      {entry ? (
        <PlayerResult entry={entry} />
      ) : (
        <p className="text-muted">Puesto libre</p>
      )}
    </li>
  )
}
