import { vi } from 'vitest'

function createMediaQueryList(media: string): MediaQueryList {
  return {
    media,
    matches: false,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }
}

export function stubMatchMedia() {
  vi.stubGlobal('matchMedia', createMediaQueryList)
}
