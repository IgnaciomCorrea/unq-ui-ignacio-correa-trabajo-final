import type { GameScreenProps } from '../interfaces.ts'
import { calculateChainScore, getNextLetter } from '../utils.ts'
import { GameHeader } from './GameHeader.tsx'
import { NextLetterHint } from './NextLetterHint.tsx'
import { TurnTimer } from './TurnTimer.tsx'
import { WordChain } from './WordChain.tsx'
import { WordForm } from './WordForm.tsx'

export function GameScreen({
  playerName,
  chain,
  remainingSeconds,
  draftWord,
  feedback,
}: GameScreenProps) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="sr-only">Partida en curso</h1>
      <GameHeader
        playerName={playerName}
        score={calculateChainScore(chain)}
        wordCount={chain.length}
      />
      <section
        aria-label="Turno actual"
        className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8"
      >
        <TurnTimer remainingSeconds={remainingSeconds} />
        <NextLetterHint letter={getNextLetter(chain)} />
        <WordForm draftWord={draftWord} feedback={feedback} />
      </section>
      <WordChain words={chain} />
    </main>
  )
}
