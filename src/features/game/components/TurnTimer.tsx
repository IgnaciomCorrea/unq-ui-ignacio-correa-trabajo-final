import { TIMER_RING, TURN_DURATION_SECONDS } from '../constants.ts'
import type { TurnTimerProps } from '../interfaces.ts'
import { getTimerDashOffset } from '../utils.ts'

export function TurnTimer({ remainingSeconds }: TurnTimerProps) {
  return (
    <div
      role="timer"
      className="relative grid size-32 place-items-center sm:size-36"
    >
      <svg
        viewBox={TIMER_RING.viewBox}
        className="absolute inset-0 size-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={TIMER_RING.center}
          cy={TIMER_RING.center}
          r={TIMER_RING.radius}
          strokeWidth={TIMER_RING.strokeWidth}
          className="fill-none stroke-border"
        />
        <circle
          cx={TIMER_RING.center}
          cy={TIMER_RING.center}
          r={TIMER_RING.radius}
          strokeWidth={TIMER_RING.strokeWidth}
          strokeDasharray={TIMER_RING.circumference}
          strokeDashoffset={getTimerDashOffset(
            remainingSeconds,
            TURN_DURATION_SECONDS,
          )}
          strokeLinecap="round"
          className="fill-none stroke-primary-text"
        />
      </svg>
      <span className="flex flex-col items-center leading-none">
        <span className="sr-only">Tiempo restante:</span>
        <span className="text-5xl font-bold tabular-nums">
          {remainingSeconds}
        </span>
        <span className="mt-1 text-xs font-semibold uppercase text-muted">
          segundos
        </span>
      </span>
    </div>
  )
}
