import type { RankBadgeProps } from '../interfaces.ts'
import { getMedalForPosition } from '../utils.ts'
import { Medal } from './Medal.tsx'

export function RankBadge({ position, withMedal }: RankBadgeProps) {
  const medal = withMedal ? getMedalForPosition(position) : undefined

  return (
    <span className="flex h-10 w-8 shrink-0 items-center justify-center">
      {medal ? (
        <Medal kind={medal} position={position} />
      ) : (
        <span className="grid size-8 place-items-center rounded-full bg-background text-sm font-bold tabular-nums text-muted">
          {position}
        </span>
      )}
    </span>
  )
}
