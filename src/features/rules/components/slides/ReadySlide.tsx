import { LEADERBOARD_SIZE } from '../../../leaderboard/constants.ts'
import { PodiumExample } from '../illustrations/PodiumExample.tsx'
import { RuleSlide } from '../RuleSlide.tsx'

export function ReadySlide() {
  return (
    <RuleSlide title="¡Listo para jugar!" illustration={<PodiumExample />}>
      <p>
        Al final vas a ver cuántas palabras encadenaste y tu puntaje. Los{' '}
        {LEADERBOARD_SIZE} mejores puntajes quedan en la pantalla de inicio.
      </p>
    </RuleSlide>
  )
}
