import { RuleSlide } from '../RuleSlide.tsx'

export function ValidWordsSlide() {
  return (
    <RuleSlide title="¿Qué palabras valen?">
      <ol className="flex list-decimal flex-col gap-2 self-center pl-6 text-left marker:font-bold marker:text-primary-text">
        <li>Tiene que existir en el diccionario español.</li>
        <li>No la podés haber usado antes en la partida.</li>
        <li>Tiene que empezar con la última letra de la palabra anterior.</li>
      </ol>
      <p className="text-base text-muted">
        Si una palabra no vale, te avisamos por qué. No entra en la cadena y no
        suma puntos.
      </p>
    </RuleSlide>
  )
}
