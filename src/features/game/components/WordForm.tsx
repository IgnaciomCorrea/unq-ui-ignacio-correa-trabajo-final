import { useId } from 'react'
import { Button } from '../../../shared/components/Button.tsx'
import { TEXT_INPUT_CLASSES } from '../../../shared/constants.ts'
import { INPUT_SHAKE_CLASSES } from '../constants.ts'
import { useWordForm } from '../hooks/useWordForm.ts'
import type { WordFormProps } from '../interfaces.ts'
import { TurnMessage } from './TurnMessage.tsx'

export function WordForm({
  inputRef,
  status,
  pendingWord,
  feedback,
  nextLetter,
  onSubmitWord,
}: WordFormProps) {
  const inputId = useId()
  const messageId = useId()
  const {
    draftWord,
    isShaking,
    handleDraftChange,
    handleSubmit,
    handleBlur,
    handleShakeEnd,
  } = useWordForm(inputRef, onSubmitWord)
  const isOver = status === 'over'
  const isValidating = pendingWord !== undefined

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2"
    >
      <label
        htmlFor={inputId}
        className="text-sm font-semibold uppercase text-muted"
      >
        Tu palabra
      </label>
      <div className="flex gap-3">
        <input
          ref={inputRef}
          id={inputId}
          name="word"
          value={draftWord}
          onChange={handleDraftChange}
          onBlur={handleBlur}
          onAnimationEnd={handleShakeEnd}
          readOnly={isValidating}
          disabled={isOver}
          placeholder="Escribí una palabra"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="send"
          aria-invalid={feedback?.kind === 'rejected'}
          aria-describedby={messageId}
          className={`${TEXT_INPUT_CLASSES} ${isShaking ? INPUT_SHAKE_CLASSES : ''}`}
        />
        <Button type="submit" disabled={isValidating || isOver}>
          Enviar
        </Button>
      </div>
      <div id={messageId}>
        <TurnMessage
          isOver={isOver}
          pendingWord={pendingWord}
          feedback={feedback}
          nextLetter={nextLetter}
        />
      </div>
    </form>
  )
}
