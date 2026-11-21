import { screen, waitFor, within } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { mockDictionary } from '../../../helpers/dictionary.ts'
import {
  advanceSeconds,
  fakeClock,
  getChainWords,
  getWordInput,
  playAcceptedWords,
  renderGameScreen,
} from '../../../helpers/gameScreen.tsx'
import { TURN_DURATION_SECONDS } from '../../../../src/features/game/constants.ts'

const KNOWN_WORDS = ['casa']

async function openAbandonDialog(user: UserEvent): Promise<HTMLElement> {
  await user.click(screen.getByRole('button', { name: 'Abandonar partida' }))

  return screen.findByRole('dialog', { name: 'Estás en una partida' })
}

async function renderStartedGame() {
  mockDictionary(KNOWN_WORDS)
  const game = await renderGameScreen()
  await playAcceptedWords(game.user, ['casa'])

  return game
}

function expectDialogToClose() {
  return waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
  )
}

describe('GameScreen abandon button', () => {
  it('leaves right away when no word was played yet', async () => {
    const { user, onExit } = await renderGameScreen()

    await user.click(screen.getByRole('button', { name: 'Abandonar partida' }))

    expect(onExit).toHaveBeenCalledOnce()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('asks for confirmation once the game has started', async () => {
    const { user, onExit } = await renderStartedGame()

    const dialog = await openAbandonDialog(user)

    expect(dialog).toHaveTextContent(
      '¿Estás seguro de que querés abandonar? ¡No se va a registrar tu progreso!',
    )
    expect(dialog.contains(document.activeElement)).toBe(true)
    expect(onExit).not.toHaveBeenCalled()
  })

  it('keeps playing when the player chooses to stay', async () => {
    const { user, onExit } = await renderStartedGame()
    const dialog = await openAbandonDialog(user)

    await user.click(
      within(dialog).getByRole('button', { name: 'Seguir jugando' }),
    )

    await expectDialogToClose()
    expect(onExit).not.toHaveBeenCalled()
    expect(getWordInput()).toHaveFocus()
    expect(getChainWords()).toEqual(['casa'])
  })

  it('keeps playing when the player presses Escape', async () => {
    const { user, onExit } = await renderStartedGame()
    await openAbandonDialog(user)

    await user.keyboard('{Escape}')

    await expectDialogToClose()
    expect(onExit).not.toHaveBeenCalled()
  })

  it('leaves the game when the player confirms', async () => {
    const { user, onExit } = await renderStartedGame()
    const dialog = await openAbandonDialog(user)

    await user.click(
      within(dialog).getByRole('button', { name: 'Sí, abandonar' }),
    )

    await waitFor(() => expect(onExit).toHaveBeenCalledOnce())
  })

  it('closes the dialog if the time runs out while it is open', async () => {
    fakeClock()
    const { user, onExit } = await renderStartedGame()
    await openAbandonDialog(user)

    advanceSeconds(TURN_DURATION_SECONDS)

    await expectDialogToClose()
    expect(
      screen.getByText('¡Se acabó el tiempo! La partida terminó.'),
    ).toBeInTheDocument()
    expect(onExit).not.toHaveBeenCalled()
  })
})
