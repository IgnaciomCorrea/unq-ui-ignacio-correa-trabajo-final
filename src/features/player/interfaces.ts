import type { ChangeEvent, FormEvent, RefObject } from 'react'

export interface PlayerNameScreenProps {
  initialName: string
  onBackHome: () => void
  onStartGame: (playerName: string) => void
}

export interface PlayerNameFormProps {
  initialName: string
  onStartGame: (playerName: string) => void
}

export interface PlayerNameForm {
  inputRef: RefObject<HTMLInputElement | null>
  name: string
  error: string | undefined
  handleNameChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}
