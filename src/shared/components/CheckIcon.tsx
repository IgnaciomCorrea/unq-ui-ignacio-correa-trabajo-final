import { CHECK_PATH, ICON_STROKE_WIDTH, ICON_VIEW_BOX } from '../constants.ts'

export function CheckIcon() {
  return (
    <svg
      viewBox={ICON_VIEW_BOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <path d={CHECK_PATH} />
    </svg>
  )
}
