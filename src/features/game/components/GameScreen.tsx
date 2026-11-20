import { BackHomeButton } from '../../../shared/components/BackHomeButton.tsx'
import { Button } from '../../../shared/components/Button.tsx'
import { PlayIcon } from '../../../shared/components/PlayIcon.tsx'
import { useFocusOnMount } from '../../../shared/hooks/useFocusOnMount.ts'
import { useAbandonGame } from '../hooks/useAbandonGame.ts'
import { useGame } from '../hooks/useGame.ts'
import type { GameScreenProps } from '../interfaces.ts'
import { AbandonGameButton } from './AbandonGameButton.tsx'
import { GameHeader } from './GameHeader.tsx'
import { NextLetterHint } from './NextLetterHint.tsx'
import { TurnTimer } from './TurnTimer.tsx'
import { WordChain } from './WordChain.tsx'
import { WordForm } from './WordForm.tsx'

export function GameScreen({
  playerName,
  onExit,
  onPlayAgain,
}: GameScreenProps) {
  const game = useGame()
  const isPlaying = game.status === 'playing'
  const isOver = game.status === 'over'
  const wordInputRef = useFocusOnMount<HTMLInputElement>()
  const abandonGame = useAbandonGame(isPlaying, onExit, wordInputRef)

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="sr-only">
        {isOver ? 'Partida terminada' : 'Partida en curso'}
      </h1>
      {isOver ? (
        <BackHomeButton onClick={onExit} />
      ) : (
        <AbandonGameButton onClick={abandonGame} />
      )}
      <GameHeader
        playerName={playerName}
        score={game.score}
        wordCount={game.chain.length}
        lastGain={game.lastGain}
      />
      <section
        aria-label="Turno actual"
        className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8"
      >
        <TurnTimer
          remainingSeconds={game.remainingSeconds}
          isRunning={isPlaying}
        />
        <NextLetterHint letter={game.nextLetter} />
        <WordForm
          inputRef={wordInputRef}
          status={game.status}
          pendingWord={game.pendingWord}
          feedback={game.feedback}
          nextLetter={game.nextLetter}
          onSubmitWord={game.submitWord}
        />
        {isOver && (
          <Button size="large" onClick={onPlayAgain}>
            Volver a jugar
            <PlayIcon />
          </Button>
        )}
      </section>
      <WordChain words={game.chain} />
    </main>
  )
}
