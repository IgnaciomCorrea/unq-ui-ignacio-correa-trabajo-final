import { describe, expect, it } from 'vitest'
import {
  LOW_TIME_THRESHOLD_SECONDS,
  MS_PER_SECOND,
  NO_TIME_LEFT,
  TURN_DURATION_MS,
  TURN_DURATION_SECONDS,
} from '../../../src/features/game/constants.ts'
import {
  calculateChainScore,
  calculateWordScore,
  findLocalRejection,
  getNextLetter,
  getRemainingSeconds,
  isLowTime,
  normalizeWord,
  toComparableWord,
  toDictionaryWord,
} from '../../../src/features/game/utils.ts'

describe('calculateWordScore', () => {
  it.each([
    { word: 'casa', points: 4 },
    { word: 'árbol', points: 5 },
    { word: 'ñandú', points: 5 },
  ])('gives one point per letter of «$word»', ({ word, points }) => {
    expect(calculateWordScore(word)).toBe(points)
  })
})

describe('calculateChainScore', () => {
  it('adds up the points of every word in the chain', () => {
    expect(calculateChainScore(['casa', 'árbol', 'luna'])).toBe(13)
  })

  it('is zero for an empty chain', () => {
    expect(calculateChainScore([])).toBe(0)
  })
})

describe('normalizeWord', () => {
  it('trims spaces and lowercases the word', () => {
    expect(normalizeWord('  CaSa  ')).toBe('casa')
  })

  it('keeps accents and ñ while lowercasing', () => {
    expect(normalizeWord('ÑANDÚ')).toBe('ñandú')
  })

  it('joins accents typed as separate characters', () => {
    expect(normalizeWord('árbol')).toBe('árbol')
  })
})

describe('toComparableWord', () => {
  it('drops accents and diaeresis but keeps ñ', () => {
    expect(toComparableWord('pingüino')).toBe('pinguino')
    expect(toComparableWord('ñandú')).toBe('ñandu')
  })
})

describe('toDictionaryWord', () => {
  it('drops accents and turns ñ into n, as the dictionary expects', () => {
    expect(toDictionaryWord('ñandú')).toBe('nandu')
  })
})

describe('getNextLetter', () => {
  it('is undefined before the first word', () => {
    expect(getNextLetter([])).toBeUndefined()
  })

  it('is the last letter of the last word, without its accent', () => {
    expect(getNextLetter(['casa', 'café'])).toBe('e')
  })
})

describe('findLocalRejection', () => {
  it('accepts any well-formed first word', () => {
    expect(findLocalRejection('árbol', [])).toBeUndefined()
  })

  it.each([
    { word: 'árbol', chain: ['casa'] },
    { word: 'elefante', chain: ['café'] },
    { word: 'nube', chain: ['pan'] },
  ])(
    'accepts «$word» after $chain, ignoring accents',
    ({ word, chain }) => {
      expect(findLocalRejection(word, chain)).toBeUndefined()
    },
  )

  it.each([
    { word: '', chain: [], reason: 'empty' },
    { word: 'dos palabras', chain: [], reason: 'invalidFormat' },
    { word: 'casa2', chain: [], reason: 'invalidFormat' },
    { word: '¡hola!', chain: [], reason: 'invalidFormat' },
    { word: 'casa', chain: ['casa'], reason: 'alreadyUsed' },
    { word: 'arbol', chain: ['árbol', 'luna'], reason: 'alreadyUsed' },
    { word: 'luna', chain: ['casa'], reason: 'brokenChain' },
    { word: 'ñandu', chain: ['pan'], reason: 'brokenChain' },
  ])('rejects «$word» after $chain as $reason', ({ word, chain, reason }) => {
    expect(findLocalRejection(word, chain)).toBe(reason)
  })
})

describe('getRemainingSeconds', () => {
  it('rounds partial seconds up', () => {
    expect(getRemainingSeconds(TURN_DURATION_MS, MS_PER_SECOND / 2)).toBe(
      TURN_DURATION_SECONDS,
    )
  })

  it('never goes below zero', () => {
    expect(getRemainingSeconds(TURN_DURATION_MS, TURN_DURATION_MS * 2)).toBe(
      NO_TIME_LEFT,
    )
  })
})

describe('isLowTime', () => {
  it.each([
    { seconds: LOW_TIME_THRESHOLD_SECONDS + 1, expected: false },
    { seconds: LOW_TIME_THRESHOLD_SECONDS, expected: true },
    { seconds: 1, expected: true },
    { seconds: NO_TIME_LEFT, expected: false },
  ])('is $expected with $seconds seconds left', ({ seconds, expected }) => {
    expect(isLowTime(seconds)).toBe(expected)
  })
})
