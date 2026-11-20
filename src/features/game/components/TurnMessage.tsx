import { FeedbackMessage } from '../../../shared/components/FeedbackMessage.tsx'
import { SINGLE_POINT } from '../constants.ts'
import type { TurnMessageProps } from '../interfaces.ts'
import { GameOverNotice } from './GameOverNotice.tsx'
import { RejectionText } from './RejectionText.tsx'

export function TurnMessage({
  isOver,
  pendingWord,
  feedback,
  nextLetter,
}: TurnMessageProps) {
  if (isOver) {
    return <GameOverNotice />
  }

  if (pendingWord !== undefined) {
    return (
      <FeedbackMessage tone="neutral">
        Buscando «{pendingWord}» en el diccionario…
      </FeedbackMessage>
    )
  }

  if (feedback === undefined) {
    return null
  }

  if (feedback.kind === 'accepted') {
    return (
      <FeedbackMessage key={feedback.id} tone="success">
        ¡Bien! «{feedback.word}» suma {feedback.points}{' '}
        {feedback.points === SINGLE_POINT ? 'punto' : 'puntos'}.
      </FeedbackMessage>
    )
  }

  return (
    <FeedbackMessage key={feedback.id} tone="error">
      <RejectionText feedback={feedback} nextLetter={nextLetter} />
    </FeedbackMessage>
  )
}
