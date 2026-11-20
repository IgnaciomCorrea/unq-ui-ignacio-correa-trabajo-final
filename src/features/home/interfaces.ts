import type { CSSProperties, Ref } from 'react'
import type { TileTone } from '../../shared/types.ts'
import type { LeaderboardEntry } from '../leaderboard/interfaces.ts'

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
  onStartGame: () => void
  onShowRules: () => void
}

export interface GameTitleProps {
  ref?: Ref<HTMLHeadingElement>
}

export interface TitleTileProps extends TitleTileData {
  tone: TileTone
}
