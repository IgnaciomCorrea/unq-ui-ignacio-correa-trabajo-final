import type { CSSProperties } from 'react'
import type { TitleWord } from './interfaces.ts'
import {
  buildTitleRows,
  getLongestWordLength,
  joinTitleWords,
} from './utils.ts'

const FULL_CONTAINER_CQI = 100

const LETTER_TO_COLUMN_RATIO = 0.5

export const TITLE_WORDS: TitleWord[] = [
  { text: 'Palabras', tone: 'neutral' },
  { text: 'Encadenadas', tone: 'primary' },
]

export const TITLE_TEXT = joinTitleWords(TITLE_WORDS)

export const TITLE_ROWS = buildTitleRows(TITLE_WORDS)

const TITLE_COLUMN_COUNT = getLongestWordLength(TITLE_WORDS)

export const TITLE_TILES_STYLE: CSSProperties = {
  fontSize: `${(FULL_CONTAINER_CQI / TITLE_COLUMN_COUNT) * LETTER_TO_COLUMN_RATIO}cqi`,
}

export const TITLE_ROW_STYLE: CSSProperties = {
  gridTemplateColumns: `repeat(${TITLE_COLUMN_COUNT}, minmax(0, 1fr))`,
}

export const TILE_TILT_CLASSES = [
  '-rotate-3',
  'rotate-2',
  '-rotate-1',
  'rotate-3',
  '-rotate-2',
  'rotate-1',
] as const
