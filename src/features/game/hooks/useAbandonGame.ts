import { useEffect, type RefObject } from 'react'
import Swal from 'sweetalert2'
import {
  ABANDON_DIALOG_CLASSES,
  ABANDON_DIALOG_ICON_COLOR,
} from '../constants.ts'

export function useAbandonGame(
  isPlaying: boolean,
  onExit: () => void,
  wordInputRef: RefObject<HTMLInputElement | null>,
): () => Promise<void> {
  useEffect(() => {
    if (isPlaying) {
      return () => Swal.close()
    }
  }, [isPlaying])

  async function abandonGame() {
    if (!isPlaying) {
      onExit()
      return
    }

    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      iconColor: ABANDON_DIALOG_ICON_COLOR,
      title: 'Estás en una partida',
      text: '¿Estás seguro de que querés abandonar? ¡No se va a registrar tu progreso!',
      showCancelButton: true,
      confirmButtonText: 'Sí, abandonar',
      cancelButtonText: 'Seguir jugando',
      focusCancel: true,
      returnFocus: false,
      buttonsStyling: false,
      customClass: ABANDON_DIALOG_CLASSES,
    })

    if (isConfirmed) {
      onExit()
      return
    }

    wordInputRef.current?.focus()
  }

  return abandonGame
}
