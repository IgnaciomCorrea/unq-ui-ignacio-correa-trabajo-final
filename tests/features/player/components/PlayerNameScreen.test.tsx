import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MAX_PLAYER_NAME_LENGTH } from '../../../../src/features/player/constants.ts'
import { PlayerNameScreen } from '../../../../src/features/player/components/PlayerNameScreen.tsx'

function renderPlayerNameScreen() {
  const onBackHome = vi.fn()
  const onStartGame = vi.fn()
  const user = userEvent.setup()

  render(
    <PlayerNameScreen onBackHome={onBackHome} onStartGame={onStartGame} />,
  )

  return { user, onBackHome, onStartGame }
}

function getNameInput(): HTMLElement {
  return screen.getByRole('textbox', { name: 'Tu nombre' })
}

describe('PlayerNameScreen', () => {
  it('starts with an empty, focused name input', () => {
    renderPlayerNameScreen()

    expect(
      screen.getByRole('heading', { name: 'Ingresá tu nombre' }),
    ).toBeInTheDocument()
    expect(getNameInput()).toHaveValue('')
    expect(getNameInput()).toHaveFocus()
    expect(
      screen.getByText(`0/${MAX_PLAYER_NAME_LENGTH} caracteres`),
    ).toBeInTheDocument()
  })

  it('starts the game with the name, without the surrounding spaces', async () => {
    const { user, onStartGame } = renderPlayerNameScreen()

    await user.type(getNameInput(), '  Nacho  ')
    await user.click(screen.getByRole('button', { name: 'Iniciar partida' }))

    expect(onStartGame).toHaveBeenCalledExactlyOnceWith('Nacho')
  })

  it('also starts the game by pressing Enter', async () => {
    const { user, onStartGame } = renderPlayerNameScreen()

    await user.type(getNameInput(), 'Nacho{Enter}')

    expect(onStartGame).toHaveBeenCalledExactlyOnceWith('Nacho')
  })

  it.each([
    { name: '', description: 'empty' },
    { name: '   ', description: 'only spaces' },
  ])('asks for a name when it is $description', async ({ name }) => {
    const { user, onStartGame } = renderPlayerNameScreen()

    await user.type(getNameInput(), `${name}{Enter}`)

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Ingresá tu nombre para empezar.',
    )
    expect(getNameInput()).toHaveAttribute('aria-invalid', 'true')
    expect(getNameInput()).toHaveFocus()
    expect(onStartGame).not.toHaveBeenCalled()
  })

  it('hides the error as soon as the player types again', async () => {
    const { user } = renderPlayerNameScreen()
    await user.type(getNameInput(), '{Enter}')

    await user.type(getNameInput(), 'N')

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(getNameInput()).toHaveAttribute('aria-invalid', 'false')
  })

  it(`allows at most ${MAX_PLAYER_NAME_LENGTH} characters`, async () => {
    const { user } = renderPlayerNameScreen()

    await user.type(getNameInput(), 'x'.repeat(MAX_PLAYER_NAME_LENGTH * 2))

    expect(getNameInput()).toHaveValue('x'.repeat(MAX_PLAYER_NAME_LENGTH))
    expect(
      screen.getByText(
        `${MAX_PLAYER_NAME_LENGTH}/${MAX_PLAYER_NAME_LENGTH} caracteres`,
      ),
    ).toBeInTheDocument()
  })

  it('goes back home', async () => {
    const { user, onBackHome, onStartGame } = renderPlayerNameScreen()

    await user.click(screen.getByRole('button', { name: 'Volver al inicio' }))

    expect(onBackHome).toHaveBeenCalledOnce()
    expect(onStartGame).not.toHaveBeenCalled()
  })
})
