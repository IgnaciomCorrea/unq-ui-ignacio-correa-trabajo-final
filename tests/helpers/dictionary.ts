import { vi } from 'vitest'
import { WORD_QUERY_PARAM } from '../../src/features/game/constants.ts'
import type { PendingDictionary } from './interfaces.ts'
import type { DictionaryAnswer, DictionaryReply, FetchMock } from './types.ts'

function readRequestedWord(input: RequestInfo | URL): string | null {
  const url = new URL(input instanceof Request ? input.url : input)

  return url.searchParams.get(WORD_QUERY_PARAM)
}

function answerWith(exists: boolean): Response {
  return Response.json({ exists })
}

function stubFetch(implementation: typeof fetch): FetchMock {
  const fetchMock = vi.fn(implementation)
  vi.stubGlobal('fetch', fetchMock)

  return fetchMock
}

export function blockNetwork(): FetchMock {
  return stubFetch(async (input) => {
    throw new Error(`Unexpected network request to ${String(input)}`)
  })
}

export function mockDictionaryReply(reply: DictionaryReply): FetchMock {
  return stubFetch(async () => reply())
}

export function mockDictionary(knownWords: readonly string[]): FetchMock {
  return stubFetch(async (input) => {
    const word = readRequestedWord(input)

    return answerWith(word !== null && knownWords.includes(word))
  })
}

export function mockPendingDictionary(): PendingDictionary {
  const pendingAnswers: DictionaryAnswer[] = []
  const fetchMock = stubFetch(
    () =>
      new Promise((resolve) => {
        pendingAnswers.push((exists) => resolve(answerWith(exists)))
      }),
  )

  return {
    fetchMock,
    answer: (exists) => pendingAnswers.shift()?.(exists),
  }
}

export function getRequestedWords(fetchMock: FetchMock): (string | null)[] {
  return fetchMock.mock.calls.map(([input]) => readRequestedWord(input))
}
