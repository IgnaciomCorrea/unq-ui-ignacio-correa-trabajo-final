import { TURN_DURATION_SECONDS } from '../../../game/constants.ts'

export function TimerExample() {
  return (
    <div className="grid size-32 place-items-center rounded-full border-8 border-primary bg-background">
      <span className="flex flex-col items-center leading-none">
        <span className="text-5xl font-bold tabular-nums">
          {TURN_DURATION_SECONDS}
        </span>
        <span className="text-sm font-semibold uppercase text-muted">
          segundos
        </span>
      </span>
    </div>
  )
}
