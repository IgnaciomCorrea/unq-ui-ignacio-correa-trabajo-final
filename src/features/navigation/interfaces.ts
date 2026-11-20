import type { Screen } from './types.ts'

export interface ScreenNavigation {
  screen: Screen
  showHome: () => void
  showRules: () => void
  showPlayerName: () => void
  showGame: () => void
}
