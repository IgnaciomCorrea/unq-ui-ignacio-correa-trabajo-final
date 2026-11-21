import { describe, expect, it, vi } from 'vitest'
import {
  getRequestedWords,
  mockDictionary,
  mockDictionaryReply,
} from '../../../helpers/dictionary.ts'

const KNOWN_WORDS = ['casa', 'arbol', 'nandu']

async function importDictionaryApi() {
  vi.resetModules()

  return import('../../../../src/features/game/api/dictionaryApi.ts')
}

describe('existsInDictionary', () => {
  it('asks the API configured in the environment variables', async () => {
    vi.stubEnv('VITE_URL_API', 'https://otra-api.test')
    vi.stubEnv('VITE_ROUTE_WORD_VALIDATION', '/validar')
    const fetchMock = mockDictionary(KNOWN_WORDS)
    const { existsInDictionary } = await importDictionaryApi()
    const { signal } = new AbortController()

    await existsInDictionary('casa', signal)

    expect(fetchMock).toHaveBeenCalledWith(
      new URL('https://otra-api.test/validar?word=casa'),
      { signal },
    )
  })

  it('tells whether the word exists', async () => {
    mockDictionary(KNOWN_WORDS)
    const { existsInDictionary } = await importDictionaryApi()
    const { signal } = new AbortController()

    await expect(existsInDictionary('casa', signal)).resolves.toBe(true)
    await expect(existsInDictionary('qwerty', signal)).resolves.toBe(false)
  })

  it('sends the word without accents and with ñ as n', async () => {
    const fetchMock = mockDictionary(KNOWN_WORDS)
    const { existsInDictionary } = await importDictionaryApi()
    const { signal } = new AbortController()

    await expect(existsInDictionary('ñandú', signal)).resolves.toBe(true)
    expect(getRequestedWords(fetchMock)).toEqual(['nandu'])
  })

  it('asks for each word only once', async () => {
    const fetchMock = mockDictionary(KNOWN_WORDS)
    const { existsInDictionary } = await importDictionaryApi()
    const { signal } = new AbortController()

    await existsInDictionary('árbol', signal)
    await expect(existsInDictionary('arbol', signal)).resolves.toBe(true)
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('fails when the API answers with an error', async () => {
    mockDictionaryReply(() => new Response(null, { status: 503 }))
    const { existsInDictionary } = await importDictionaryApi()

    await expect(
      existsInDictionary('casa', new AbortController().signal),
    ).rejects.toThrow()
  })

  it('fails when the API answer is not what it expects', async () => {
    mockDictionaryReply(() => Response.json({ valid: true }))
    const { existsInDictionary } = await importDictionaryApi()

    await expect(
      existsInDictionary('casa', new AbortController().signal),
    ).rejects.toThrow()
  })

  it('asks again after a failed request', async () => {
    mockDictionaryReply(() => new Response(null, { status: 503 }))
    const { existsInDictionary } = await importDictionaryApi()
    const { signal } = new AbortController()

    await expect(existsInDictionary('casa', signal)).rejects.toThrow()
    mockDictionary(KNOWN_WORDS)
    await expect(existsInDictionary('casa', signal)).resolves.toBe(true)
  })
})
