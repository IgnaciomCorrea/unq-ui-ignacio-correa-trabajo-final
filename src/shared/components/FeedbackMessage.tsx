import { FEEDBACK_ROLES, FEEDBACK_TONE_CLASSES } from '../constants.ts'
import type { FeedbackMessageProps } from '../interfaces.ts'
import { FeedbackIcon } from './FeedbackIcon.tsx'

export function FeedbackMessage({ id, tone, children }: FeedbackMessageProps) {
  return (
    <p
      id={id}
      role={FEEDBACK_ROLES[tone]}
      className={`flex items-start gap-2 rounded-xl border-2 px-4 py-3 font-medium ${FEEDBACK_TONE_CLASSES[tone]}`}
    >
      <FeedbackIcon tone={tone} />
      <span>{children}</span>
    </p>
  )
}
