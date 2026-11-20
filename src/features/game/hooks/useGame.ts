import { useReducer } from 'react'
import type { Game } from '../interfaces.ts'
import { createGameState, gameReducer } from '../reducer.ts'
import type { DictionaryResult, WordOutcome } from '../types.ts'
import {
  calculateChainScore,
  findLocalRejection,
  getNextLetter,
  normalizeWord,
} from '../utils.ts'
import { useDictionaryCheck } from './useDictionaryCheck.ts'
import { useTurnTimer } from './useTurnTimer.ts'

export function useGame(): Game {
  const [state, dispatch] = useReducer(gameReducer, undefined, createGameState)
  const dictionary = useDictionaryCheck()

  useTurnTimer(state.status === 'playing', dispatch)

  function applyDictionaryResult(
    word: string,
    result: DictionaryResult,
  ): WordOutcome {
    switch (result) {
      case 'found':
        dispatch({ type: 'wordAccepted', word, now: Date.now() })
        return 'accepted'
      case 'missing':
        dispatch({ type: 'wordRejected', word, reason: 'notInDictionary' })
        return 'rejected'
      case 'unavailable':
        dispatch({ type: 'wordRejected', word, reason: 'unavailable' })
        return 'rejected'
      case 'cancelled':
        return 'ignored'
    }
  }

  async function submitWord(rawWord: string): Promise<WordOutcome> {
    if (state.status === 'over' || dictionary.isChecking()) {
      return 'ignored'
    }

    const word = normalizeWord(rawWord)
    const localRejection = findLocalRejection(word, state.chain)

    if (localRejection !== undefined) {
      dispatch({ type: 'wordRejected', word, reason: localRejection })
      return 'rejected'
    }

    dispatch({ type: 'validationStarted', word })

    return applyDictionaryResult(word, await dictionary.check(word))
  }

  return {
    status: state.status,
    chain: state.chain,
    score: calculateChainScore(state.chain),
    nextLetter: getNextLetter(state.chain),
    remainingSeconds: state.remainingSeconds,
    pendingWord: state.pendingWord,
    feedback: state.feedback,
    lastGain: state.lastGain,
    submitWord,
  }
}
