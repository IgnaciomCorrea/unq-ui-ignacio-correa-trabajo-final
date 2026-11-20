import type { TitleRow, TitleWord } from './interfaces.ts'

export function joinTitleWords(words: TitleWord[]): string {
  return words.map((word) => word.text).join(' ')
}

export function getLongestWordLength(words: TitleWord[]): number {
  return Math.max(...words.map((word) => word.text.length))
}

function countLetters(words: TitleWord[]): number {
  return words.reduce((total, word) => total + word.text.length, 0)
}

export function buildTitleRows(words: TitleWord[]): TitleRow[] {
  return words.map((word, wordIndex) => {
    const firstTileIndex = countLetters(words.slice(0, wordIndex))

    return {
      ...word,
      tiles: [...word.text].map((letter, letterIndex) => ({
        letter,
        index: firstTileIndex + letterIndex,
      })),
    }
  })
}
