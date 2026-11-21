import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LEADERBOARD_SIZE } from '../../../../src/features/leaderboard/constants.ts'
import type { LeaderboardEntry } from '../../../../src/features/leaderboard/interfaces.ts'
import { HomeScreen } from '../../../../src/features/home/components/HomeScreen.tsx'

const ENTRIES: LeaderboardEntry[] = [
  { id: 'first', playerName: 'Nacho', score: 40, wordCount: 8 },
  { id: 'second', playerName: 'Tincho', score: 5, wordCount: 1 },
]

function renderHomeScreen() {
  const onStartGame = vi.fn()
  const onShowRules = vi.fn()
  const user = userEvent.setup()

  render(
    <HomeScreen
      leaderboardEntries={ENTRIES}
      onStartGame={onStartGame}
      onShowRules={onShowRules}
    />,
  )

  return { user, onStartGame, onShowRules }
}

function getLeaderboardSlots(): HTMLElement[] {
  const leaderboard = screen.getByRole('region', { name: 'Mejores puntajes' })

  return within(leaderboard).getAllByRole('listitem')
}

describe('HomeScreen', () => {
  it('shows the game title focused', () => {
    renderHomeScreen()

    expect(
      screen.getByRole('heading', { level: 1, name: 'Palabras Encadenadas' }),
    ).toHaveFocus()
  })

  it(`always shows ${LEADERBOARD_SIZE} positions in the leaderboard`, () => {
    renderHomeScreen()

    expect(getLeaderboardSlots()).toHaveLength(LEADERBOARD_SIZE)
    expect(screen.getAllByText('Puesto libre')).toHaveLength(
      LEADERBOARD_SIZE - ENTRIES.length,
    )
  })

  it('shows each player with their words and points', () => {
    renderHomeScreen()
    const [first, second] = getLeaderboardSlots()

    expect(first).toHaveTextContent('Nacho')
    expect(first).toHaveTextContent('8 palabras')
    expect(first).toHaveTextContent('40')
    expect(second).toHaveTextContent('Tincho')
    expect(second).toHaveTextContent('1 palabra')
  })

  it('gives medals only to the players on the podium', () => {
    renderHomeScreen()

    expect(screen.getByText('Puesto 1, medalla de oro')).toBeInTheDocument()
    expect(screen.getByText('Puesto 2, medalla de plata')).toBeInTheDocument()
    expect(screen.queryByText(/medalla de bronce/)).not.toBeInTheDocument()
  })

  it('opens the game and the rules', async () => {
    const { user, onStartGame, onShowRules } = renderHomeScreen()

    await user.click(screen.getByRole('button', { name: 'Iniciar juego' }))
    await user.click(
      screen.getByRole('button', { name: '¿Primera vez jugando?' }),
    )

    expect(onStartGame).toHaveBeenCalledOnce()
    expect(onShowRules).toHaveBeenCalledOnce()
  })
})
