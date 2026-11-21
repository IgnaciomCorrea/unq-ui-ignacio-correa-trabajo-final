import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  mockDictionary,
  mockPendingDictionary,
} from '../../../helpers/dictionary.ts'
import {
  advanceSeconds,
  fakeClock,
  getChainWords,
  getStatValue,
  getWordInput,
  playAcceptedWords,
  playWord,
  renderGameScreen,
} from '../../../helpers/gameScreen.tsx'
import {
  LOW_TIME_THRESHOLD_SECONDS,
  NO_TIME_LEFT,
  TURN_DURATION_SECONDS,
} from '../../../../src/features/game/constants.ts'

const KNOWN_WORDS = ['casa', 'arbol', 'luna']

const SECONDS_UNTIL_LOW_TIME =
  TURN_DURATION_SECONDS - LOW_TIME_THRESHOLD_SECONDS

const GAME_OVER_MESSAGE = '¡Se acabó el tiempo! La partida terminó.'

function getRemainingTime(seconds: number): HTMLElement {
  return screen.getByText(`Tiempo restante: ${seconds} segundos`)
}

describe('GameScreen turn timer', () => {
  beforeEach(() => {
    fakeClock()
  })

  it('does not start the clock before the first word', async () => {
    await renderGameScreen()

    advanceSeconds(TURN_DURATION_SECONDS * 2)

    expect(getRemainingTime(TURN_DURATION_SECONDS)).toBeInTheDocument()
    expect(getWordInput()).toBeEnabled()
  })

  it('counts down from the first valid word', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()
    await playAcceptedWords(user, ['casa'])

    advanceSeconds(1)

    expect(getRemainingTime(TURN_DURATION_SECONDS - 1)).toBeInTheDocument()
    expect(screen.queryByText('¡Apurate!')).not.toBeInTheDocument()
  })

  it('warns the player when the time is running low', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()
    await playAcceptedWords(user, ['casa'])

    advanceSeconds(SECONDS_UNTIL_LOW_TIME)

    expect(getRemainingTime(LOW_TIME_THRESHOLD_SECONDS)).toBeInTheDocument()
    expect(screen.getByText('¡Apurate!')).toBeInTheDocument()
    expect(
      screen.getByText('¡Apurate! Quedan pocos segundos.'),
    ).toBeInTheDocument()
  })

  it('gives a full turn again only after a valid word', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()
    await playAcceptedWords(user, ['casa'])
    advanceSeconds(SECONDS_UNTIL_LOW_TIME)

    await playWord(user, 'luna')

    expect(getRemainingTime(LOW_TIME_THRESHOLD_SECONDS)).toBeInTheDocument()

    await playAcceptedWords(user, ['árbol'])

    expect(getRemainingTime(TURN_DURATION_SECONDS)).toBeInTheDocument()
  })

  it('ends the game when the time runs out', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()
    await playAcceptedWords(user, ['casa', 'árbol'])

    advanceSeconds(TURN_DURATION_SECONDS)

    expect(screen.getByRole('alert')).toHaveTextContent(GAME_OVER_MESSAGE)
    expect(screen.getByRole('alert')).toHaveFocus()
    expect(
      screen.getByRole('heading', { name: 'Partida terminada' }),
    ).toBeInTheDocument()
    expect(getRemainingTime(NO_TIME_LEFT)).toBeInTheDocument()
    expect(getWordInput()).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled()
    expect(
      screen.queryByRole('button', { name: 'Abandonar partida' }),
    ).not.toBeInTheDocument()
  })

  it('shows the final score and the chained words', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()
    await playAcceptedWords(user, ['casa', 'árbol'])

    advanceSeconds(TURN_DURATION_SECONDS)

    expect(getStatValue('Puntaje')).toBe(9)
    expect(getStatValue('Palabras')).toBe(2)
    expect(getChainWords()).toEqual(['casa', 'árbol'])
  })

  it('offers to play again or go back home when the game is over', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user, onExit, onPlayAgain } = await renderGameScreen()
    await playAcceptedWords(user, ['casa'])
    advanceSeconds(TURN_DURATION_SECONDS)

    await user.click(screen.getByRole('button', { name: 'Volver a jugar' }))

    expect(onPlayAgain).toHaveBeenCalledOnce()

    await user.click(screen.getByRole('button', { name: 'Volver al inicio' }))

    expect(onExit).toHaveBeenCalledOnce()
  })

  it('still accepts a valid word sent before the time ran out', async () => {
    const dictionary = mockPendingDictionary()
    const { user } = await renderGameScreen()
    await playWord(user, 'casa')
    dictionary.answer(true)
    await screen.findByText('¡Bien! «casa» suma 4 puntos.')

    await playWord(user, 'árbol')
    advanceSeconds(TURN_DURATION_SECONDS)

    expect(getRemainingTime(NO_TIME_LEFT)).toBeInTheDocument()
    expect(screen.queryByText(GAME_OVER_MESSAGE)).not.toBeInTheDocument()

    dictionary.answer(true)

    expect(
      await screen.findByText('¡Bien! «árbol» suma 5 puntos.'),
    ).toBeInTheDocument()
    expect(getRemainingTime(TURN_DURATION_SECONDS)).toBeInTheDocument()
    expect(getWordInput()).toBeEnabled()
  })

  it('ends the game if the word sent before the time ran out is invalid', async () => {
    const dictionary = mockPendingDictionary()
    const { user } = await renderGameScreen()
    await playWord(user, 'casa')
    dictionary.answer(true)
    await screen.findByText('¡Bien! «casa» suma 4 puntos.')

    await playWord(user, 'arena')
    advanceSeconds(TURN_DURATION_SECONDS)
    dictionary.answer(false)

    expect(await screen.findByText(GAME_OVER_MESSAGE)).toBeInTheDocument()
    expect(getChainWords()).toEqual(['casa'])
  })
})
