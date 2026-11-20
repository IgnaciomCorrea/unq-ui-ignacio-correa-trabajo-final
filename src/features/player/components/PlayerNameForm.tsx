import { useId } from 'react'
import { AlertIcon } from '../../../shared/components/AlertIcon.tsx'
import { Button } from '../../../shared/components/Button.tsx'
import { FeedbackMessage } from '../../../shared/components/FeedbackMessage.tsx'
import { PlayIcon } from '../../../shared/components/PlayIcon.tsx'
import { TEXT_INPUT_CLASSES } from '../../../shared/constants.ts'
import { MAX_PLAYER_NAME_LENGTH } from '../constants.ts'
import { usePlayerNameForm } from '../hooks/usePlayerNameForm.ts'
import type { PlayerNameFormProps } from '../interfaces.ts'

export function PlayerNameForm({
  initialName,
  onStartGame,
}: PlayerNameFormProps) {
  const titleId = useId()
  const inputId = useId()
  const counterId = useId()
  const noticeId = useId()
  const errorId = useId()
  const { inputRef, name, error, handleNameChange, handleSubmit } =
    usePlayerNameForm(initialName, onStartGame)
  const hasError = error !== undefined
  const describedBy = hasError
    ? `${noticeId} ${counterId} ${errorId}`
    : `${noticeId} ${counterId}`

  return (
    <form
      noValidate
      aria-labelledby={titleId}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-10"
    >
      <div className="flex flex-col gap-2">
        <h1 id={titleId} className="text-3xl font-bold sm:text-4xl">
          Ingresá tu nombre
        </h1>
        <p className="text-lg text-muted">
          Así vas a aparecer en los mejores puntajes.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold uppercase text-muted"
        >
          Tu nombre
        </label>
        <input
          ref={inputRef}
          id={inputId}
          name="playerName"
          value={name}
          onChange={handleNameChange}
          maxLength={MAX_PLAYER_NAME_LENGTH}
          autoComplete="nickname"
          autoCapitalize="words"
          spellCheck={false}
          enterKeyHint="go"
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className={TEXT_INPUT_CLASSES}
        />
        <p id={counterId} className="self-end text-sm tabular-nums text-muted">
          {name.length}/{MAX_PLAYER_NAME_LENGTH} caracteres
        </p>
        {hasError && <FeedbackMessage id={errorId} message={error} />}
      </div>
      <p
        id={noticeId}
        className="flex items-start gap-3 rounded-xl border-2 border-border-strong bg-background px-4 py-3 font-medium"
      >
        <span className="text-primary-text">
          <AlertIcon />
        </span>
        La partida empieza apenas escribas tu primera palabra: en ese momento
        arranca el reloj.
      </p>
      <Button type="submit" size="large">
        Iniciar partida
        <PlayIcon />
      </Button>
    </form>
  )
}
