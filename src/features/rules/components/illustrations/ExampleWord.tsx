import { TILE_TONE_CLASSES } from '../../../../shared/constants.ts'
import type { ExampleWordProps } from '../../interfaces.ts'
import { buildLetterTiles } from '../../utils.ts'

export function ExampleWord({
  word,
  highlightFirst = false,
  highlightLast = false,
}: ExampleWordProps) {
  const tiles = buildLetterTiles(word, highlightFirst, highlightLast)

  return (
    <span className="inline-flex">
      <span className="sr-only">{word}</span>
      <span aria-hidden="true" className="flex gap-1">
        {tiles.map((tile, index) => (
          <span
            key={index}
            className={`grid size-8 place-items-center rounded-md border-2 text-base font-bold uppercase leading-none sm:size-10 sm:text-lg ${TILE_TONE_CLASSES[tile.tone]}`}
          >
            {tile.letter}
          </span>
        ))}
      </span>
    </span>
  )
}
