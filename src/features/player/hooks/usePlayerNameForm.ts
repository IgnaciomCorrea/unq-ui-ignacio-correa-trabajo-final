import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useFocusOnMount } from '../../../shared/hooks/useFocusOnMount.ts'
import { getFirstIssueMessage } from '../../../shared/utils.ts'
import type { PlayerNameForm } from '../interfaces.ts'
import { playerNameSchema } from '../schemas.ts'

export function usePlayerNameForm(
  onValidName: (playerName: string) => void,
): PlayerNameForm {
  const inputRef = useFocusOnMount<HTMLInputElement>()
  const [name, setName] = useState('')
  const [error, setError] = useState<string>()

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
    setError(undefined)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = playerNameSchema.safeParse(name)

    if (result.success) {
      onValidName(result.data)
      return
    }

    setError(getFirstIssueMessage(result.error))
    inputRef.current?.focus()
  }

  return { inputRef, name, error, handleNameChange, handleSubmit }
}
