import { render, screen } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { RulesScreen } from '../../../../src/features/rules/components/RulesScreen.tsx'
import { RULE_SLIDES } from '../../../../src/features/rules/components/slides/ruleSlides.ts'

const SLIDE_COUNT = RULE_SLIDES.length

function renderRulesScreen() {
  const onBackHome = vi.fn()
  const onStartGame = vi.fn()
  const user = userEvent.setup()

  render(<RulesScreen onBackHome={onBackHome} onStartGame={onStartGame} />)

  return { user, onBackHome, onStartGame }
}

function getSlide(position: number): HTMLElement {
  return screen.getByRole('group', {
    name: `Regla ${position} de ${SLIDE_COUNT}`,
  })
}

async function goToLastSlide(user: UserEvent) {
  for (let position = 1; position < SLIDE_COUNT; position++) {
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))
  }
}

describe('RulesScreen', () => {
  it('starts on the first rule with the title focused', () => {
    renderRulesScreen()

    expect(
      screen.getByRole('heading', { name: 'Reglas del juego' }),
    ).toHaveFocus()
    expect(getSlide(1)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Armá la cadena más larga' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Anterior' }),
    ).not.toBeInTheDocument()
  })

  it('moves forward and back through the rules', async () => {
    const { user } = renderRulesScreen()

    await user.click(screen.getByRole('button', { name: 'Siguiente' }))

    expect(getSlide(2)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Anterior' }))

    expect(getSlide(1)).toBeInTheDocument()
  })

  it('moves the focus to the next button when the previous one disappears', async () => {
    const { user } = renderRulesScreen()
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))

    await user.click(screen.getByRole('button', { name: 'Anterior' }))

    expect(screen.getByRole('button', { name: 'Siguiente' })).toHaveFocus()
  })

  it('offers to start a game on the last rule', async () => {
    const { user, onStartGame } = renderRulesScreen()

    await goToLastSlide(user)

    expect(getSlide(SLIDE_COUNT)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '¡Listo para jugar!' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Siguiente' }),
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Iniciar partida' }))

    expect(onStartGame).toHaveBeenCalledOnce()
  })

  it('goes back home', async () => {
    const { user, onBackHome } = renderRulesScreen()

    await user.click(screen.getByRole('button', { name: 'Volver al inicio' }))

    expect(onBackHome).toHaveBeenCalledOnce()
  })
})
