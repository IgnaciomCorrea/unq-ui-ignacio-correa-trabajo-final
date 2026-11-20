import { BackHomeButton } from '../../../shared/components/BackHomeButton.tsx'
import type { PlayerNameScreenProps } from '../interfaces.ts'
import { PlayerNameForm } from './PlayerNameForm.tsx'

export function PlayerNameScreen({
  onBackHome,
  onStartGame,
}: PlayerNameScreenProps) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <BackHomeButton onClick={onBackHome} />
      <div className="flex flex-1 flex-col justify-center">
        <PlayerNameForm onStartGame={onStartGame} />
      </div>
    </main>
  )
}
