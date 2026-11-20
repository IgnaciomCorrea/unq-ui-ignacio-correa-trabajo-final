import { useState } from 'react'
import { INITIAL_SCREEN } from '../constants.ts'
import type { ScreenNavigation } from '../interfaces.ts'
import type { Screen } from '../types.ts'

export function useScreenNavigation(): ScreenNavigation {
  const [screen, setScreen] = useState<Screen>(INITIAL_SCREEN)

  return {
    screen,
    showHome: () => setScreen('home'),
    showRules: () => setScreen('rules'),
    showPlayerName: () => setScreen('playerName'),
    showGame: () => setScreen('game'),
  }
}
