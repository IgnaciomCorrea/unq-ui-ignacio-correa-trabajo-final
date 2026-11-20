import { POINTS_PER_LETTER } from '../../../game/constants.ts'
import type { RuleSlideContentProps } from '../../interfaces.ts'
import { ScoreExample } from '../illustrations/ScoreExample.tsx'
import { RuleSlide } from '../RuleSlide.tsx'

export function ScoreSlide({ exampleChain }: RuleSlideContentProps) {
  return (
    <RuleSlide
      title="Cada letra suma"
      illustration={<ScoreExample words={exampleChain} />}
    >
      <p>
        Cada letra de una palabra válida vale {POINTS_PER_LETTER} punto. Cuanto
        más larga la palabra, más puntos sumás.
      </p>
    </RuleSlide>
  )
}
