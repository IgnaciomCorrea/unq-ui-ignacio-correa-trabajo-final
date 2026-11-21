import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { blockNetwork } from './helpers/dictionary.ts'
import { stubMatchMedia } from './helpers/matchMedia.ts'

beforeEach(() => {
  blockNetwork()
  stubMatchMedia()
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})
