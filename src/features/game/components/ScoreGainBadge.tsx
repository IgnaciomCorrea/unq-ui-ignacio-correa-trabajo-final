import type { ScoreGainBadgeProps } from '../interfaces.ts'

export function ScoreGainBadge({ points }: ScoreGainBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-3 -right-2 rounded-full bg-success-solid px-2 py-0.5 text-sm font-bold text-success-foreground shadow-sm motion-safe:animate-score-gain motion-reduce:animate-score-fade"
    >
      +{points}
    </span>
  )
}
