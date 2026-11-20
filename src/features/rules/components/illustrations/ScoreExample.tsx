import {
  calculateChainScore,
  calculateWordScore,
} from '../../../game/utils.ts'
import type { ExampleWordListProps } from '../../interfaces.ts'
import { ExampleWord } from './ExampleWord.tsx'

export function ScoreExample({ words }: ExampleWordListProps) {
  return (
    <div className="inline-flex flex-col items-end gap-3">
      {words.map((word) => (
        <div key={word} className="flex items-center gap-3">
          <ExampleWord word={word} />
          <span className="w-12 text-left text-lg font-bold tabular-nums text-primary-text">
            +{calculateWordScore(word)}
          </span>
        </div>
      ))}
      <p className="self-stretch border-t-2 border-border pt-3 text-right text-lg font-bold">
        Total: {calculateChainScore(words)} puntos
      </p>
    </div>
  )
}
