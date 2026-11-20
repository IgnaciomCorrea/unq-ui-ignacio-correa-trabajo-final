import { indexToPosition } from '../../../../shared/utils.ts'
import { Medal } from '../../../leaderboard/components/Medal.tsx'
import { PODIUM_MEDALS } from '../../../leaderboard/constants.ts'

export function PodiumExample() {
  return (
    <div className="flex items-end justify-center gap-4">
      {PODIUM_MEDALS.map((medal, index) => (
        <Medal key={medal} kind={medal} position={indexToPosition(index)} />
      ))}
    </div>
  )
}
