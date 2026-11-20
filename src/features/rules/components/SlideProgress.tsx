import { PROGRESS_DOT_CLASSES } from '../constants.ts'
import type { SlideProgressProps } from '../interfaces.ts'

export function SlideProgress({ count, currentIndex }: SlideProgressProps) {
  return (
    <div aria-hidden="true" className="flex justify-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={`h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
            index === currentIndex
              ? PROGRESS_DOT_CLASSES.active
              : PROGRESS_DOT_CLASSES.inactive
          }`}
        />
      ))}
    </div>
  )
}
