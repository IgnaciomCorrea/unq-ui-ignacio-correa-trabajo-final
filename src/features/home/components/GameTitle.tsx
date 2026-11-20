import {
  TITLE_ROWS,
  TITLE_ROW_STYLE,
  TITLE_TEXT,
  TITLE_TILES_STYLE,
} from '../constants.ts'
import { TitleTile } from './TitleTile.tsx'

export function GameTitle() {
  return (
    <h1 className="@container w-full max-w-xl">
      <span className="sr-only">{TITLE_TEXT}</span>
      <span
        aria-hidden="true"
        className="flex flex-col gap-2 sm:gap-3"
        style={TITLE_TILES_STYLE}
      >
        {TITLE_ROWS.map((row) => (
          <span
            key={row.text}
            className="grid gap-1 sm:gap-2"
            style={TITLE_ROW_STYLE}
          >
            {row.tiles.map((tile) => (
              <TitleTile key={tile.index} {...tile} tone={row.tone} />
            ))}
          </span>
        ))}
      </span>
    </h1>
  )
}
