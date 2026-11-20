import { Fragment } from 'react'
import { ArrowIcon } from '../../../../shared/components/ArrowIcon.tsx'
import { isFirstIndex, isLastIndex } from '../../../../shared/utils.ts'
import type { ExampleWordListProps } from '../../interfaces.ts'
import { ExampleWord } from './ExampleWord.tsx'

export function WordChainExample({ words }: ExampleWordListProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
      {words.map((word, index) => (
        <Fragment key={word}>
          {!isFirstIndex(index) && (
            <span className="text-muted">
              <ArrowIcon direction="right" />
            </span>
          )}
          <ExampleWord
            word={word}
            highlightFirst={!isFirstIndex(index)}
            highlightLast={!isLastIndex(index, words.length)}
          />
        </Fragment>
      ))}
    </div>
  )
}
