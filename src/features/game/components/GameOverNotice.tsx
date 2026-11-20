import { PROGRAMMATIC_FOCUS_TAB_INDEX } from '../../../shared/constants.ts'
import { useFocusOnMount } from '../../../shared/hooks/useFocusOnMount.ts'

export function GameOverNotice() {
  const noticeRef = useFocusOnMount<HTMLParagraphElement>()

  return (
    <p
      ref={noticeRef}
      role="alert"
      tabIndex={PROGRAMMATIC_FOCUS_TAB_INDEX}
      className="rounded-xl border-2 border-primary bg-background px-4 py-3 text-center text-lg font-bold text-primary-text outline-none"
    >
      ¡Se acabó el tiempo! La partida terminó.
    </p>
  )
}
