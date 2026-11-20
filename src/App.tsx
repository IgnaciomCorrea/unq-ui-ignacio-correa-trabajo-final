import { useState } from 'react'
import { GameScreen } from './features/game/components/GameScreen.tsx'
import { PLACEHOLDER_GAME } from './features/game/placeholderGame.ts'
import { HomeScreen } from './features/home/components/HomeScreen.tsx'
import { PLACEHOLDER_ENTRIES } from './features/leaderboard/placeholderEntries.ts'
import { useScreenNavigation } from './features/navigation/hooks/useScreenNavigation.ts'
import { PlayerNameScreen } from './features/player/components/PlayerNameScreen.tsx'
import { RulesScreen } from './features/rules/components/RulesScreen.tsx'

export function App() {
  const { screen, showHome, showRules, showPlayerName, showGame } =
    useScreenNavigation()
  const [playerName, setPlayerName] = useState('')

  function handleStartGame(name: string) {
    setPlayerName(name)
    showGame()
  }

  switch (screen) {
    case 'home':
      return (
        <HomeScreen
          leaderboardEntries={PLACEHOLDER_ENTRIES}
          onStartGame={showPlayerName}
          onShowRules={showRules}
        />
      )
    case 'rules':
      return <RulesScreen onBackHome={showHome} onStartGame={showPlayerName} />
    case 'playerName':
      return (
        <PlayerNameScreen
          initialName={playerName}
          onBackHome={showHome}
          onStartGame={handleStartGame}
        />
      )
    case 'game':
      return <GameScreen {...PLACEHOLDER_GAME} playerName={playerName} />
  }
}
