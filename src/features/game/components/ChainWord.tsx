import { buildLetterTiles } from '../../../shared/utils.ts'
import { CHAIN_WORD_CLASSES, LETTER_TONE_TEXT_CLASSES } from '../constants.ts'
import type { ChainWordProps } from '../interfaces.ts'

export function ChainWord({ word, isFirst, isNewest }: ChainWordProps) {
  const letters = buildLetterTiles(word, !isFirst, true)

  return (
    <span
      className={`rounded-xl border-2 bg-surface px-3 py-1 text-lg font-semibold motion-safe:animate-word-pop ${
        isNewest ? CHAIN_WORD_CLASSES.newest : CHAIN_WORD_CLASSES.previous
      }`}
    >
      {letters.map((letter, index) => (
        <span key={index} className={LETTER_TONE_TEXT_CLASSES[letter.tone]}>
          {letter.letter}
        </span>
      ))}
    </span>
  )
}
