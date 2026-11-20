import { HomeScreen } from './features/home/components/HomeScreen.tsx'
import { PLACEHOLDER_ENTRIES } from './features/leaderboard/placeholderEntries.ts'
import { useScreenNavigation } from './features/navigation/hooks/useScreenNavigation.ts'
import { RulesScreen } from './features/rules/components/RulesScreen.tsx'

export function App() {
  const { screen, showHome, showRules } = useScreenNavigation()

  switch (screen) {
    case 'home':
      return (
        <HomeScreen
          leaderboardEntries={PLACEHOLDER_ENTRIES}
          onShowRules={showRules}
        />
      )
    case 'rules':
      return <RulesScreen onBackHome={showHome} />
  }
}
