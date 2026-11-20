import { useState } from 'react'
import { GameScreen } from './features/game/components/GameScreen.tsx'
import { FIRST_GAME_ROUND, GAME_ROUND_STEP } from './features/game/constants.ts'
import { HomeScreen } from './features/home/components/HomeScreen.tsx'
import { PLACEHOLDER_ENTRIES } from './features/leaderboard/placeholderEntries.ts'
import { useScreenNavigation } from './features/navigation/hooks/useScreenNavigation.ts'
import { PlayerNameScreen } from './features/player/components/PlayerNameScreen.tsx'
import { RulesScreen } from './features/rules/components/RulesScreen.tsx'

export function App() {
  const { screen, showHome, showRules, showPlayerName, showGame } =
    useScreenNavigation()
  const [playerName, setPlayerName] = useState('')
  const [gameRound, setGameRound] = useState(FIRST_GAME_ROUND)

  function handleStartGame(name: string) {
    setPlayerName(name)
    showGame()
  }

  function handlePlayAgain() {
    setGameRound((round) => round + GAME_ROUND_STEP)
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
          onBackHome={showHome}
          onStartGame={handleStartGame}
        />
      )
    case 'game':
      return (
        <GameScreen
          key={gameRound}
          playerName={playerName}
          onExit={showHome}
          onPlayAgain={handlePlayAgain}
        />
      )
  }
}
