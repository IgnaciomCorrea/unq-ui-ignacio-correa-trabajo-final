import {
  TIMER_RING,
  TIMER_TONE_CLASSES,
  TURN_DURATION_SECONDS,
} from '../constants.ts'
import type { TurnTimerProps } from '../interfaces.ts'
import { getTimerDashOffset, isLowTime } from '../utils.ts'

export function TurnTimer({ remainingSeconds, isRunning }: TurnTimerProps) {
  const isRunningLow = isRunning && isLowTime(remainingSeconds)
  const toneClasses = TIMER_TONE_CLASSES[isRunningLow ? 'low' : 'normal']

  return (
    <>
      <div
        role="timer"
        className={`relative grid size-32 place-items-center sm:size-36 ${toneClasses.container}`}
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
        <span className="sr-only">
          Tiempo restante: {remainingSeconds} segundos
        </span>
        <span
          aria-hidden="true"
          className="flex flex-col items-center leading-none"
        >
          <span className={`text-5xl font-bold tabular-nums ${toneClasses.value}`}>
            {remainingSeconds}
          </span>
          <span
            className={`mt-1 text-xs font-semibold uppercase ${toneClasses.label}`}
          >
            {isRunningLow ? '¡Apurate!' : 'segundos'}
          </span>
        </span>
      </div>
      <p aria-live="polite" className="sr-only">
        {isRunningLow && '¡Apurate! Quedan pocos segundos.'}
      </p>
    </>
  )
}
