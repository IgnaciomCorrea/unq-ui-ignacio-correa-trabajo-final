import { MEDAL_STYLES, MEDAL_SVG } from '../constants.ts'
import type { MedalProps } from '../interfaces.ts'

export function Medal({ kind, position }: MedalProps) {
  const style = MEDAL_STYLES[kind]

  return (
    <>
      <svg viewBox={MEDAL_SVG.viewBox} className="h-10 w-8" aria-hidden="true">
        <path d={MEDAL_SVG.leftRibbonPath} className="fill-primary" />
        <path d={MEDAL_SVG.rightRibbonPath} className="fill-primary-hover" />
        <circle
          cx={MEDAL_SVG.centerX}
          cy={MEDAL_SVG.centerY}
          r={MEDAL_SVG.radius}
          strokeWidth={MEDAL_SVG.strokeWidth}
          className={style.body}
        />
        <text
          x={MEDAL_SVG.centerX}
          y={MEDAL_SVG.centerY}
          textAnchor="middle"
          dominantBaseline="central"
          className={`text-xs font-bold ${style.number}`}
        >
          {position}
        </text>
      </svg>
      <span className="sr-only">
        Puesto {position}, medalla de {style.label}
      </span>
    </>
  )
}
