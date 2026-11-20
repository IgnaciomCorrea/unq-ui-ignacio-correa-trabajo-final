import { getCyclicItem } from '../../../shared/utils.ts'
import { TILE_TILT_CLASSES, TILE_TONE_CLASSES } from '../constants.ts'
import type { TileStyle, TitleTileProps } from '../interfaces.ts'

export function TitleTile({ letter, tone, index }: TitleTileProps) {
  const style: TileStyle = { '--tile-index': index }
  const tilt = getCyclicItem(TILE_TILT_CLASSES, index)

  return (
    <span className="motion-safe:animate-tile-pop" style={style}>
      <span
        className={`grid aspect-square place-items-center rounded-md border-2 font-bold uppercase leading-none transition-transform duration-150 sm:rounded-lg motion-safe:animate-tile-wave motion-safe:hover:-translate-y-1.5 ${tilt} ${TILE_TONE_CLASSES[tone]}`}
      >
        {letter}
      </span>
    </span>
  )
}
