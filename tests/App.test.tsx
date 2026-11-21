import { render, screen, within } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TURN_DURATION_SECONDS } from '../src/features/game/constants.ts'
import { mockDictionary } from './helpers/dictionary.ts'
import {
  advanceSeconds,
  fakeClock,
  getChainWords,
  getStatValue,
  getWordInput,
  playAcceptedWords,
} from './helpers/gameScreen.tsx'

const KNOWN_WORDS = ['casa', 'arbol']

async function renderApp(): Promise<UserEvent> {
  vi.resetModules()
  const { App } = await import('../src/App.tsx')
  const user = userEvent.setup()

  render(<App />)

  return user
}

function getHomeTitle(): HTMLElement {
  return screen.getByRole('heading', {
    level: 1,
    name: 'Palabras Encadenadas',
  })
}

async function startGameAs(user: UserEvent, playerName: string) {
  await user.click(screen.getByRole('button', { name: 'Iniciar juego' }))
  await user.type(
    screen.getByRole('textbox', { name: 'Tu nombre' }),
    `${playerName}{Enter}`,
  )
}

describe('App', () => {
  it('plays a whole game from the home screen', async () => {
    fakeClock()
    mockDictionary(KNOWN_WORDS)
    const user = await renderApp()

    expect(getHomeTitle()).toHaveFocus()

    await startGameAs(user, 'Nacho')

    expect(screen.getByText('Nacho')).toBeInTheDocument()
    expect(getWordInput()).toHaveFocus()

    await playAcceptedWords(user, ['casa', 'árbol'])
    advanceSeconds(TURN_DURATION_SECONDS)

    expect(screen.getByRole('alert')).toHaveTextContent(
      '¡Se acabó el tiempo! La partida terminó.',
    )
    expect(getStatValue('Puntaje')).toBe(9)
    expect(getStatValue('Palabras')).toBe(2)

    await user.click(screen.getByRole('button', { name: 'Volver al inicio' }))

    expect(getHomeTitle()).toBeInTheDocument()
  })

  it('goes from the rules to the name screen', async () => {
    const user = await renderApp()

    await user.click(
      screen.getByRole('button', { name: '¿Primera vez jugando?' }),
    )
    const rules = screen.getByRole('region', { name: 'Reglas del juego' })

    while (within(rules).queryByRole('button', { name: 'Siguiente' })) {
      await user.click(within(rules).getByRole('button', { name: 'Siguiente' }))
    }
    await user.click(screen.getByRole('button', { name: 'Iniciar partida' }))

    expect(
      screen.getByRole('heading', { name: 'Ingresá tu nombre' }),
    ).toBeInTheDocument()
  })

  it('plays again with the same name and a fresh game', async () => {
    fakeClock()
    mockDictionary(KNOWN_WORDS)
    const user = await renderApp()
    await startGameAs(user, 'Nacho')
    await playAcceptedWords(user, ['casa'])
    advanceSeconds(TURN_DURATION_SECONDS)

    await user.click(screen.getByRole('button', { name: 'Volver a jugar' }))

    expect(screen.getByText('Nacho')).toBeInTheDocument()
    expect(getStatValue('Puntaje')).toBe(0)
    expect(getStatValue('Palabras')).toBe(0)
    expect(getChainWords()).toEqual([])
    expect(
      screen.getByText(`Tiempo restante: ${TURN_DURATION_SECONDS} segundos`),
    ).toBeInTheDocument()
    expect(getWordInput()).toBeEnabled()
    expect(getWordInput()).toHaveFocus()

    await playAcceptedWords(user, ['casa'])

    expect(getChainWords()).toEqual(['casa'])
  })

  it('asks for the name from scratch after leaving the name screen', async () => {
    const user = await renderApp()
    await user.click(screen.getByRole('button', { name: 'Iniciar juego' }))
    await user.type(screen.getByRole('textbox', { name: 'Tu nombre' }), 'Nacho')

    await user.click(screen.getByRole('button', { name: 'Volver al inicio' }))
    await user.click(screen.getByRole('button', { name: 'Iniciar juego' }))

    expect(screen.getByRole('textbox', { name: 'Tu nombre' })).toHaveValue('')
  })

  it('goes back home after confirming to abandon the game', async () => {
    mockDictionary(KNOWN_WORDS)
    const user = await renderApp()
    await startGameAs(user, 'Nacho')
    await playAcceptedWords(user, ['casa'])

    await user.click(screen.getByRole('button', { name: 'Abandonar partida' }))
    const dialog = await screen.findByRole('dialog', {
      name: 'Estás en una partida',
    })
    await user.click(
      within(dialog).getByRole('button', { name: 'Sí, abandonar' }),
    )

    expect(await screen.findByText('Mejores puntajes')).toBeInTheDocument()
    expect(getHomeTitle()).toBeInTheDocument()
  })
})
