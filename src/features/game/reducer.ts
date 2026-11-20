import {
  FEEDBACK_ID_STEP,
  INITIAL_FEEDBACK_COUNT,
  TURN_DURATION_MS,
  TURN_DURATION_SECONDS,
} from './constants.ts'
import type { GameState } from './interfaces.ts'
import type { GameAction, RejectionReason } from './types.ts'
import { calculateWordScore, getRemainingSeconds, isTimeUp } from './utils.ts'

export function createGameState(): GameState {
  return {
    status: 'ready',
    chain: [],
    turnDeadline: undefined,
    remainingSeconds: TURN_DURATION_SECONDS,
    pendingWord: undefined,
    feedback: undefined,
    lastGain: undefined,
    feedbackCount: INITIAL_FEEDBACK_COUNT,
  }
}

function acceptWord(state: GameState, word: string, now: number): GameState {
  const feedbackId = state.feedbackCount + FEEDBACK_ID_STEP
  const points = calculateWordScore(word)

  return {
    ...state,
    status: 'playing',
    chain: [...state.chain, word],
    turnDeadline: now + TURN_DURATION_MS,
    remainingSeconds: TURN_DURATION_SECONDS,
    pendingWord: undefined,
    feedback: { id: feedbackId, kind: 'accepted', word, points },
    lastGain: { id: feedbackId, points },
    feedbackCount: feedbackId,
  }
}

function rejectWord(
  state: GameState,
  word: string,
  reason: RejectionReason,
): GameState {
  const feedbackId = state.feedbackCount + FEEDBACK_ID_STEP
  const hasRunOutOfTime =
    state.status === 'playing' && isTimeUp(state.remainingSeconds)

  return {
    ...state,
    status: hasRunOutOfTime ? 'over' : state.status,
    pendingWord: undefined,
    feedback: { id: feedbackId, kind: 'rejected', word, reason },
    feedbackCount: feedbackId,
  }
}

function updateClock(state: GameState, now: number): GameState {
  if (state.status !== 'playing' || state.turnDeadline === undefined) {
    return state
  }

  const remainingSeconds = getRemainingSeconds(state.turnDeadline, now)
  const isOver =
    isTimeUp(remainingSeconds) && state.pendingWord === undefined

  if (remainingSeconds === state.remainingSeconds && !isOver) {
    return state
  }

  return { ...state, remainingSeconds, status: isOver ? 'over' : state.status }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (state.status === 'over') {
    return state
  }

  switch (action.type) {
    case 'validationStarted':
      return { ...state, pendingWord: action.word, feedback: undefined }
    case 'wordAccepted':
      return acceptWord(state, action.word, action.now)
    case 'wordRejected':
      return rejectWord(state, action.word, action.reason)
    case 'tick':
      return updateClock(state, action.now)
  }
}
