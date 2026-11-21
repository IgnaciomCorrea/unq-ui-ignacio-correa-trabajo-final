import { act, render, screen, within } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { vi } from 'vitest'
import { MS_PER_SECOND } from '../../src/features/game/constants.ts'
import type { RenderedGameScreen } from './interfaces.ts'

export async function renderGameScreen(
  playerName = 'Nacho',
): Promise<RenderedGameScreen> {
  vi.resetModules()
  const { GameScreen } = await import(
    '../../src/features/game/components/GameScreen.tsx'
  )
  const onExit = vi.fn()
  const onPlayAgain = vi.fn()
  const user = userEvent.setup()

  render(
    <GameScreen
      playerName={playerName}
      onExit={onExit}
      onPlayAgain={onPlayAgain}
    />,
  )

  return { user, onExit, onPlayAgain }
}

export function getWordInput(): HTMLElement {
  return screen.getByRole('textbox', { name: 'Tu palabra' })
}

export async function playWord(user: UserEvent, word: string) {
  const input = getWordInput()

  await user.clear(input)
  await user.type(input, `${word}{Enter}`)
}

export async function playAcceptedWords(
  user: UserEvent,
  words: readonly string[],
) {
  for (const word of words) {
    await playWord(user, word)
    await screen.findByText(`¡Bien! «${word}»`, { exact: false })
  }
}

export function getStatValue(label: string): number {
  const value = screen.getByText(label).nextElementSibling?.firstChild

  return Number(value?.textContent)
}

export function getChainWords(): string[] {
  const chain = screen.getByRole('region', { name: 'Tu cadena' })

  return within(chain)
    .queryAllByRole('listitem')
    .map((item) => item.textContent ?? '')
}

export function getNextLetterHint(): HTMLElement {
  return screen.getByText(/La próxima palabra empieza con/)
}

export function fakeClock() {
  vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] })
}

export function advanceSeconds(seconds: number) {
  act(() => {
    vi.advanceTimersByTime(seconds * MS_PER_SECOND)
  })
}
