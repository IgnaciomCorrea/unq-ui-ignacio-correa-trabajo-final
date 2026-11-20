import type { FeedbackMessageProps } from '../interfaces.ts'
import { AlertIcon } from './AlertIcon.tsx'

export function FeedbackMessage({ id, message }: FeedbackMessageProps) {
  return (
    <p
      id={id}
      role="alert"
      className="flex items-start gap-2 rounded-xl border-2 border-error-border bg-error-surface px-4 py-3 font-medium text-error"
    >
      <AlertIcon />
      <span>{message}</span>
    </p>
  )
}
