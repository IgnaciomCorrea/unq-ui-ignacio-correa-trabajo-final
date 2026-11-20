import { FIRST_POSITION, PODIUM_MEDALS } from './constants.ts'
import type { LeaderboardEntry } from './interfaces.ts'
import type { MedalKind } from './types.ts'

export function getEntryAtPosition(
  entries: LeaderboardEntry[],
  position: number,
): LeaderboardEntry | undefined {
  return entries.at(position - FIRST_POSITION)
}

export function getMedalForPosition(position: number): MedalKind | undefined {
  return PODIUM_MEDALS.at(position - FIRST_POSITION)
}
