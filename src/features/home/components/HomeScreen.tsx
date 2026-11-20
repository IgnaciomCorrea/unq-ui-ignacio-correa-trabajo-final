import { Button } from '../../../shared/components/Button.tsx'
import { useFocusOnMount } from '../../../shared/hooks/useFocusOnMount.ts'
import { Leaderboard } from '../../leaderboard/components/Leaderboard.tsx'
import type { HomeScreenProps } from '../interfaces.ts'
import { GameTitle } from './GameTitle.tsx'

export function HomeScreen({
  leaderboardEntries,
  onStartGame,
  onShowRules,
}: HomeScreenProps) {
  const titleRef = useFocusOnMount<HTMLHeadingElement>()

  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-2xl content-center gap-10 px-4 py-10 sm:px-6 lg:max-w-6xl lg:grid-cols-5 lg:items-center lg:gap-16">
      <div className="flex flex-col gap-10 lg:col-span-3">
        <GameTitle ref={titleRef} />
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Button onClick={onStartGame}>Iniciar juego</Button>
          <Button variant="secondary" onClick={onShowRules}>
            ¿Primera vez jugando?
          </Button>
        </div>
      </div>
      <div className="lg:col-span-2">
        <Leaderboard entries={leaderboardEntries} />
      </div>
    </main>
  )
}
