import { useEffect, type Dispatch } from 'react'
import { TIMER_TICK_MS } from '../constants.ts'
import type { GameAction } from '../types.ts'

export function useTurnTimer(
  isRunning: boolean,
  dispatch: Dispatch<GameAction>,
) {
  useEffect(() => {
    if (!isRunning) {
      return
    }

    const intervalId = setInterval(
      () => dispatch({ type: 'tick', now: Date.now() }),
      TIMER_TICK_MS,
    )

    return () => clearInterval(intervalId)
  }, [isRunning, dispatch])
}
