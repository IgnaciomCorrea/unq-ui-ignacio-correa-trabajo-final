import { ARROW_PATHS, ICON_STROKE_WIDTH, ICON_VIEW_BOX } from '../constants.ts'
import type { ArrowIconProps } from '../interfaces.ts'

export function ArrowIcon({ direction }: ArrowIconProps) {
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
      <path d={ARROW_PATHS[direction]} />
    </svg>
  )
}
