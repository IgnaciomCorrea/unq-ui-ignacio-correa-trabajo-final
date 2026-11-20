import type { GameStatProps } from '../interfaces.ts'

export function GameStat({ label, value }: GameStatProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-2 text-center">
      <dt className="text-xs font-semibold uppercase text-muted">{label}</dt>
      <dd className="text-2xl font-bold tabular-nums">{value}</dd>
    </div>
  )
}
