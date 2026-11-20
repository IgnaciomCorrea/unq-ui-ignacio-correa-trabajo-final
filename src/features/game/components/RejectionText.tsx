import type { RejectionTextProps } from '../interfaces.ts'

export function RejectionText({ feedback, nextLetter }: RejectionTextProps) {
  const { word, reason } = feedback

  switch (reason) {
    case 'empty':
      return 'Escribí una palabra antes de enviar.'
    case 'invalidFormat':
      return 'Usá solo letras, sin espacios, números ni símbolos.'
    case 'alreadyUsed':
      return <>Ya usaste «{word}» en esta partida. Probá con otra palabra.</>
    case 'brokenChain':
      return (
        <>
          «{word}» no empieza con «{nextLetter}». Probá con otra palabra.
        </>
      )
    case 'notInDictionary':
      return (
        <>«{word}» no está en el diccionario. Probá con otra palabra.</>
      )
    case 'unavailable':
      return (
        <>
          No pudimos validar «{word}». Revisá tu conexión y volvé a enviarla.
        </>
      )
  }
}
