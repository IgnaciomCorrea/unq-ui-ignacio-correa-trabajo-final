import { useState } from 'react'
import { shuffle } from '../../../shared/utils.ts'
import { EXAMPLE_CHAINS } from '../constants.ts'
import type { ExampleChain } from '../types.ts'

export function useExampleChains(): readonly ExampleChain[] {
  const [exampleChains] = useState(() => shuffle(EXAMPLE_CHAINS))

  return exampleChains
}
