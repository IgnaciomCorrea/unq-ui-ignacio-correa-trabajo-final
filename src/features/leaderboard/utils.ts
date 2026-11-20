import { positionToIndex } from '../../shared/utils.ts'
import { PODIUM_MEDALS } from './constants.ts'
import type { LeaderboardEntry } from './interfaces.ts'
import type { MedalKind } from './types.ts'

export function getEntryAtPosition(
  entries: LeaderboardEntry[],
  position: number,
): LeaderboardEntry | undefined {
  return entries.at(positionToIndex(position))
}

export function getMedalForPosition(position: number): MedalKind | undefined {
  return PODIUM_MEDALS.at(positionToIndex(position))
}
