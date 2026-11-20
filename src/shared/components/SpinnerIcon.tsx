import { ICON_STROKE_WIDTH, ICON_VIEW_BOX, SPINNER_PATH } from '../constants.ts'

export function SpinnerIcon() {
  return (
    <svg
      viewBox={ICON_VIEW_BOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE_WIDTH}
      strokeLinecap="round"
      className="size-5 shrink-0 motion-safe:animate-spin"
      aria-hidden="true"
    >
      <path d={SPINNER_PATH} />
    </svg>
  )
}
