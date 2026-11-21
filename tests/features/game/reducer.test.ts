import { describe, expect, it } from 'vitest'
import {
  LOW_TIME_THRESHOLD_SECONDS,
  MS_PER_SECOND,
  NO_TIME_LEFT,
  TURN_DURATION_MS,
  TURN_DURATION_SECONDS,
} from '../../../src/features/game/constants.ts'
import type { GameState } from '../../../src/features/game/interfaces.ts'
import { createGameState, gameReducer } from '../../../src/features/game/reducer.ts'
import type { GameAction } from '../../../src/features/game/types.ts'

const GAME_START = 0

const LOW_TIME_MS =
  (TURN_DURATION_SECONDS - LOW_TIME_THRESHOLD_SECONDS) * MS_PER_SECOND

function play(actions: readonly GameAction[]): GameState {
  return actions.reduce(gameReducer, createGameState())
}

function accept(word: string, now: number): GameAction {
  return { type: 'wordAccepted', word, now }
}

function tickAt(now: number): GameAction {
  return { type: 'tick', now }
}

describe('gameReducer', () => {
  it('starts waiting for the first word with a full turn', () => {
    expect(createGameState()).toMatchObject({
      status: 'ready',
      chain: [],
      remainingSeconds: TURN_DURATION_SECONDS,
      turnDeadline: undefined,
    })
  })

  it('does not run the clock before the first word', () => {
    const state = play([tickAt(TURN_DURATION_MS * 2)])

    expect(state.status).toBe('ready')
    expect(state.remainingSeconds).toBe(TURN_DURATION_SECONDS)
  })

  it('starts the game and the clock with the first valid word', () => {
    const state = play([accept('casa', GAME_START)])

    expect(state).toMatchObject({
      status: 'playing',
      chain: ['casa'],
      turnDeadline: GAME_START + TURN_DURATION_MS,
      feedback: { kind: 'accepted', word: 'casa', points: 4 },
      lastGain: { points: 4 },
    })
  })

  it('counts the turn down as time goes by', () => {
    const state = play([accept('casa', GAME_START), tickAt(LOW_TIME_MS)])

    expect(state.remainingSeconds).toBe(LOW_TIME_THRESHOLD_SECONDS)
    expect(state.status).toBe('playing')
  })

  it('ends the game when the turn runs out', () => {
    const state = play([accept('casa', GAME_START), tickAt(TURN_DURATION_MS)])

    expect(state.status).toBe('over')
    expect(state.remainingSeconds).toBe(NO_TIME_LEFT)
  })

  it('gives a full turn again after each valid word', () => {
    const state = play([
      accept('casa', GAME_START),
      tickAt(LOW_TIME_MS),
      accept('árbol', LOW_TIME_MS),
      tickAt(TURN_DURATION_MS),
    ])

    expect(state.status).toBe('playing')
    expect(state.chain).toEqual(['casa', 'árbol'])
    expect(state.remainingSeconds).toBe(
      TURN_DURATION_SECONDS - LOW_TIME_THRESHOLD_SECONDS,
    )
  })

  it('keeps the clock running after an invalid word', () => {
    const state = play([
      accept('casa', GAME_START),
      tickAt(LOW_TIME_MS),
      { type: 'wordRejected', word: 'luna', reason: 'brokenChain' },
    ])

    expect(state.chain).toEqual(['casa'])
    expect(state.remainingSeconds).toBe(LOW_TIME_THRESHOLD_SECONDS)
    expect(state.feedback).toMatchObject({
      kind: 'rejected',
      word: 'luna',
      reason: 'brokenChain',
    })
    expect(gameReducer(state, tickAt(TURN_DURATION_MS)).status).toBe('over')
  })

  it('waits for a word that was sent before the time ran out', () => {
    const state = play([
      accept('casa', GAME_START),
      { type: 'validationStarted', word: 'árbol' },
      tickAt(TURN_DURATION_MS),
    ])

    expect(state.status).toBe('playing')
    expect(state.remainingSeconds).toBe(NO_TIME_LEFT)
    expect(state.pendingWord).toBe('árbol')
  })

  it('goes on with a full turn if that late word is valid', () => {
    const state = play([
      accept('casa', GAME_START),
      { type: 'validationStarted', word: 'árbol' },
      tickAt(TURN_DURATION_MS),
      accept('árbol', TURN_DURATION_MS),
    ])

    expect(state.status).toBe('playing')
    expect(state.remainingSeconds).toBe(TURN_DURATION_SECONDS)
    expect(state.chain).toEqual(['casa', 'árbol'])
  })

  it('ends the game if that late word is invalid', () => {
    const state = play([
      accept('casa', GAME_START),
      { type: 'validationStarted', word: 'árbol' },
      tickAt(TURN_DURATION_MS),
      { type: 'wordRejected', word: 'árbol', reason: 'notInDictionary' },
    ])

    expect(state.status).toBe('over')
    expect(state.chain).toEqual(['casa'])
  })

  it('ignores everything once the game is over', () => {
    const over = play([accept('casa', GAME_START), tickAt(TURN_DURATION_MS)])

    expect(gameReducer(over, accept('árbol', TURN_DURATION_MS))).toBe(over)
  })
})
