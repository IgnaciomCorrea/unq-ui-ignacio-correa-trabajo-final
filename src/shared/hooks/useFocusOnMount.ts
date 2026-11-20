import { useEffect, useRef } from 'react'

export function useFocusOnMount<Target extends HTMLElement>() {
  const ref = useRef<Target>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return ref
}
