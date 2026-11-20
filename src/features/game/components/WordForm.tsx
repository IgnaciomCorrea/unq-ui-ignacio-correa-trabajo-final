import { useId, type FormEvent } from 'react'
import { Button } from '../../../shared/components/Button.tsx'
import { FeedbackMessage } from '../../../shared/components/FeedbackMessage.tsx'
import { TEXT_INPUT_CLASSES } from '../../../shared/constants.ts'
import type { WordFormProps } from '../interfaces.ts'

export function WordForm({ draftWord, feedback }: WordFormProps) {
  const inputId = useId()
  const feedbackId = useId()
  const hasFeedback = feedback !== undefined

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

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
          id={inputId}
          name="word"
          defaultValue={draftWord}
          placeholder="Escribí una palabra"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="send"
          aria-invalid={hasFeedback}
          aria-describedby={hasFeedback ? feedbackId : undefined}
          className={TEXT_INPUT_CLASSES}
        />
        <Button type="submit">Enviar</Button>
      </div>
      {hasFeedback && <FeedbackMessage id={feedbackId} message={feedback} />}
    </form>
  )
}
