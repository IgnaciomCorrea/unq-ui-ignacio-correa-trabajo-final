import { HomeScreen } from './features/home/components/HomeScreen.tsx'
import { PLACEHOLDER_ENTRIES } from './features/leaderboard/placeholderEntries.ts'

export function App() {
  return <HomeScreen leaderboardEntries={PLACEHOLDER_ENTRIES} />
}
