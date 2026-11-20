import type { MedalKind } from './types.ts'

export interface LeaderboardEntry {
  id: string
  playerName: string
  score: number
  wordCount: number
}

export interface MedalStyle {
  body: string
  number: string
  label: string
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[]
}

export interface LeaderboardSlotProps {
  position: number
  entry: LeaderboardEntry | undefined
}

export interface RankBadgeProps {
  position: number
  withMedal: boolean
}

export interface MedalProps {
  kind: MedalKind
  position: number
}

export interface PlayerResultProps {
  entry: LeaderboardEntry
}
