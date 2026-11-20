import { TURN_DURATION_SECONDS } from '../../../game/constants.ts'
import { TimerExample } from '../illustrations/TimerExample.tsx'
import { RuleSlide } from '../RuleSlide.tsx'

export function TimerSlide() {
  return (
    <RuleSlide title="Jugá contra el reloj" illustration={<TimerExample />}>
      <p>
        Tenés {TURN_DURATION_SECONDS} segundos por turno. El reloj arranca con
        tu primera palabra y vuelve a {TURN_DURATION_SECONDS} con cada palabra
        válida. Las que no valen no lo reinician.
      </p>
      <p className="text-base text-muted">
        Si llega a cero, se termina la partida. Si mandaste una palabra justo
        antes, igual cuenta.
      </p>
    </RuleSlide>
  )
}
