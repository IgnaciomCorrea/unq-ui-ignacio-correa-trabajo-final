import type { FeedbackIconProps } from '../interfaces.ts'
import { AlertIcon } from './AlertIcon.tsx'
import { CheckIcon } from './CheckIcon.tsx'
import { SpinnerIcon } from './SpinnerIcon.tsx'

export function FeedbackIcon({ tone }: FeedbackIconProps) {
  switch (tone) {
    case 'error':
      return <AlertIcon />
    case 'success':
      return <CheckIcon />
    case 'neutral':
      return <SpinnerIcon />
  }
}
