import { useEffect, useRef } from 'react'
import { existsInDictionary } from '../api/dictionaryApi.ts'
import { DICTIONARY_TIMEOUT_MS } from '../constants.ts'
import type { DictionaryCheck } from '../interfaces.ts'
import type { DictionaryResult } from '../types.ts'

export function useDictionaryCheck(): DictionaryCheck {
  const pendingRequestRef = useRef<AbortController>(null)

  useEffect(() => {
    return () => pendingRequestRef.current?.abort()
  }, [])

  function isChecking(): boolean {
    return pendingRequestRef.current !== null
  }

  async function check(word: string): Promise<DictionaryResult> {
    const request = new AbortController()
    pendingRequestRef.current = request

    try {
      const exists = await existsInDictionary(
        word,
        AbortSignal.any([
          request.signal,
          AbortSignal.timeout(DICTIONARY_TIMEOUT_MS),
        ]),
      )

      return exists ? 'found' : 'missing'
    } catch {
      return request.signal.aborted ? 'cancelled' : 'unavailable'
    } finally {
      pendingRequestRef.current = null
    }
  }

  return { isChecking, check }
}
