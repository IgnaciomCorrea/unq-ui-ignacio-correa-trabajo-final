import { ICON_STROKE_WIDTH, ICON_VIEW_BOX, PLAY_PATH } from '../constants.ts'

export function PlayIcon() {
  return (
    <svg
      viewBox={ICON_VIEW_BOX}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={ICON_STROKE_WIDTH}
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <path d={PLAY_PATH} />
    </svg>
  )
}
