import type { RuleSlideContentProps } from '../../interfaces.ts'
import { getChainLink } from '../../utils.ts'
import { WordChainExample } from '../illustrations/WordChainExample.tsx'
import { RuleSlide } from '../RuleSlide.tsx'

export function ChainSlide({ exampleChain }: RuleSlideContentProps) {
  const link = getChainLink(exampleChain)

  return (
    <RuleSlide
      title="Encadená las palabras"
      illustration={<WordChainExample words={[link.from, link.to]} />}
    >
      <p>
        Cada palabra tiene que empezar con la última letra de la anterior. La
        primera puede ser cualquiera.
      </p>
      <p className="text-base text-muted">
        Las tildes no cuentan: después de «{link.from}» vale «{link.to}». La ñ,
        en cambio, es una letra distinta de la n.
      </p>
    </RuleSlide>
  )
}
