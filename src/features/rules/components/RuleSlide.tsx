import type { RuleSlideProps } from '../interfaces.ts'

export function RuleSlide({ title, illustration, children }: RuleSlideProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center sm:gap-8">
      <h2 className="text-2xl font-bold text-balance sm:text-3xl">{title}</h2>
      {illustration}
      <div className="flex max-w-prose flex-col gap-3 text-lg">{children}</div>
    </div>
  )
}
