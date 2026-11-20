import { useId } from 'react'
import { ArrowIcon } from '../../../shared/components/ArrowIcon.tsx'
import { isFirstIndex, isLastIndex } from '../../../shared/utils.ts'
import type { WordChainProps } from '../interfaces.ts'
import { ChainWord } from './ChainWord.tsx'

export function WordChain({ words }: WordChainProps) {
  const titleId = useId()

  return (
    <section aria-labelledby={titleId} className="flex flex-col gap-3">
      <h2 id={titleId} className="text-lg font-bold">
        Tu cadena
      </h2>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {words.map((word, index) => (
          <li key={word} className="flex items-center gap-2">
            {!isFirstIndex(index) && (
              <span className="text-muted">
                <ArrowIcon direction="right" />
              </span>
            )}
            <ChainWord
              word={word}
              isFirst={isFirstIndex(index)}
              isNewest={isLastIndex(index, words.length)}
            />
          </li>
        ))}
      </ol>
    </section>
  )
}
