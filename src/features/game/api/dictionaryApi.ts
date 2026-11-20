import { WORD_QUERY_PARAM, WORD_VALIDATION_ENDPOINT } from '../constants.ts'
import { wordValidationResponseSchema } from '../schemas.ts'
import { toDictionaryWord } from '../utils.ts'

const dictionaryCache = new Map<string, boolean>()

export async function existsInDictionary(
  word: string,
  signal: AbortSignal,
): Promise<boolean> {
  const dictionaryWord = toDictionaryWord(word)
  const cachedResult = dictionaryCache.get(dictionaryWord)

  if (cachedResult !== undefined) {
    return cachedResult
  }

  const url = new URL(WORD_VALIDATION_ENDPOINT)
  url.searchParams.set(WORD_QUERY_PARAM, dictionaryWord)

  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Word validation failed with status ${response.status}`)
  }

  const { exists } = wordValidationResponseSchema.parse(await response.json())
  dictionaryCache.set(dictionaryWord, exists)

  return exists
}
