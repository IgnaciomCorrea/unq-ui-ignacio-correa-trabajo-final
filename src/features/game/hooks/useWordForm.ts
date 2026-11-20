import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type RefObject,
} from 'react'
import type { WordFormState } from '../interfaces.ts'
import type { WordOutcome } from '../types.ts'

export function useWordForm(
  inputRef: RefObject<HTMLInputElement | null>,
  onSubmitWord: (rawWord: string) => Promise<WordOutcome>,
): WordFormState {
  const [draftWord, setDraftWord] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  function handleDraftChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftWord(event.target.value)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    inputRef.current?.focus()

    const outcome = await onSubmitWord(draftWord)

    if (outcome === 'accepted') {
      setDraftWord('')
    }

    if (outcome === 'rejected') {
      setIsShaking(true)
      inputRef.current?.select()
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    if (event.relatedTarget === null) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  function handleShakeEnd() {
    setIsShaking(false)
  }

  return {
    draftWord,
    isShaking,
    handleDraftChange,
    handleSubmit,
    handleBlur,
    handleShakeEnd,
  }
}
