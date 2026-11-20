import type { CSSProperties } from 'react'
import type { LeaderboardEntry } from '../leaderboard/interfaces.ts'
import type { TileTone } from './types.ts'

export interface TitleWord {
  text: string
  tone: TileTone
}

export interface TitleTileData {
  letter: string
  index: number
}

export interface TitleRow extends TitleWord {
  tiles: TitleTileData[]
}

export interface TileStyle extends CSSProperties {
  '--tile-index': number
}

export interface HomeScreenProps {
  leaderboardEntries: LeaderboardEntry[]
}

export interface TitleTileProps extends TitleTileData {
  tone: TileTone
}
