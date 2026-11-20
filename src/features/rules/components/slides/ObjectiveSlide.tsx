import type { RuleSlideContentProps } from '../../interfaces.ts'
import { WordChainExample } from '../illustrations/WordChainExample.tsx'
import { RuleSlide } from '../RuleSlide.tsx'

export function ObjectiveSlide({ exampleChain }: RuleSlideContentProps) {
  return (
    <RuleSlide
      title="Armá la cadena más larga"
      illustration={<WordChainExample words={exampleChain} />}
    >
      <p>
        Escribí palabras que se enganchen una con la otra y sumá todos los
        puntos que puedas antes de que se termine el tiempo.
      </p>
    </RuleSlide>
  )
}
