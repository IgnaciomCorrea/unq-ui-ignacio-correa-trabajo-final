import { useId } from 'react'
import { ArrowIcon } from '../../../shared/components/ArrowIcon.tsx'
import { Button } from '../../../shared/components/Button.tsx'
import { PROGRAMMATIC_FOCUS_TAB_INDEX } from '../../../shared/constants.ts'
import { useFocusOnMount } from '../../../shared/hooks/useFocusOnMount.ts'
import { getCyclicItem, indexToPosition } from '../../../shared/utils.ts'
import { SLIDE_ANIMATION_CLASSES } from '../constants.ts'
import { useExampleChains } from '../hooks/useExampleChains.ts'
import { useSlideshow } from '../hooks/useSlideshow.ts'
import type { RulesScreenProps } from '../interfaces.ts'
import { RULE_SLIDES } from './slides/ruleSlides.ts'
import { SlideControls } from './SlideControls.tsx'
import { SlideProgress } from './SlideProgress.tsx'

export function RulesScreen({ onBackHome }: RulesScreenProps) {
  const headingId = useId()
  const headingRef = useFocusOnMount<HTMLHeadingElement>()
  const slideshow = useSlideshow(RULE_SLIDES.length)
  const exampleChains = useExampleChains()
  const CurrentSlide = RULE_SLIDES[slideshow.index]
  const exampleChain = getCyclicItem(exampleChains, slideshow.index)

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <div>
        <Button variant="ghost" size="compact" onClick={onBackHome}>
          <ArrowIcon direction="left" />
          Volver al inicio
        </Button>
      </div>
      <h1
        id={headingId}
        ref={headingRef}
        tabIndex={PROGRAMMATIC_FOCUS_TAB_INDEX}
        className="text-3xl font-bold outline-none sm:text-4xl"
      >
        Reglas del juego
      </h1>
      <section
        aria-roledescription="carrusel"
        aria-labelledby={headingId}
        className="flex flex-1 flex-col gap-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-10"
      >
        <div aria-live="polite" className="flex flex-1 flex-col overflow-hidden">
          <div
            key={slideshow.index}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`Regla ${indexToPosition(slideshow.index)} de ${RULE_SLIDES.length}`}
            className={`flex flex-1 flex-col ${SLIDE_ANIMATION_CLASSES[slideshow.direction]}`}
          >
            <CurrentSlide exampleChain={exampleChain} />
          </div>
        </div>
        <SlideProgress
          count={RULE_SLIDES.length}
          currentIndex={slideshow.index}
        />
        <SlideControls
          isFirst={slideshow.isFirst}
          isLast={slideshow.isLast}
          onPrevious={slideshow.goToPrevious}
          onNext={slideshow.goToNext}
        />
      </section>
    </main>
  )
}
