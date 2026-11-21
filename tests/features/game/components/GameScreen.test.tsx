import { screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  mockDictionary,
  mockDictionaryReply,
  mockPendingDictionary,
} from '../../../helpers/dictionary.ts'
import {
  getChainWords,
  getNextLetterHint,
  getStatValue,
  getWordInput,
  playAcceptedWords,
  playWord,
  renderGameScreen,
} from '../../../helpers/gameScreen.tsx'
import { TURN_DURATION_SECONDS } from '../../../../src/features/game/constants.ts'

const KNOWN_WORDS = ['casa', 'arbol', 'luna', 'pan', 'nandu', 'nube']

describe('GameScreen', () => {
  it('shows an empty game waiting for the first word', async () => {
    await renderGameScreen('Nacho')

    expect(screen.getByText('Nacho')).toBeInTheDocument()
    expect(getStatValue('Puntaje')).toBe(0)
    expect(getStatValue('Palabras')).toBe(0)
    expect(
      screen.getByText(`Tiempo restante: ${TURN_DURATION_SECONDS} segundos`),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Escribí cualquier palabra para empezar'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Acá vas a ver las palabras que vayas encadenando.'),
    ).toBeInTheDocument()
    expect(getWordInput()).toHaveFocus()
  })

  it('shows that the word is being checked while the dictionary answers', async () => {
    const dictionary = mockPendingDictionary()
    const { user } = await renderGameScreen()

    await playWord(user, 'casa')

    expect(screen.getByRole('status')).toHaveTextContent(
      'Buscando «casa» en el diccionario…',
    )
    expect(getWordInput()).toHaveAttribute('readonly')
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled()

    dictionary.answer(true)

    expect(
      await screen.findByText('¡Bien! «casa» suma 4 puntos.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeEnabled()
  })

  it('adds a valid word to the chain and scores it', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()

    await playAcceptedWords(user, ['casa'])

    expect(getStatValue('Puntaje')).toBe(4)
    expect(getStatValue('Palabras')).toBe(1)
    expect(screen.getByText('+4')).toBeInTheDocument()
    expect(getChainWords()).toEqual(['casa'])
    expect(within(getNextLetterHint()).getByText('a')).toBeInTheDocument()
    expect(getWordInput()).toHaveValue('')
    expect(getWordInput()).toHaveFocus()
  })

  it('scores one point per letter along the whole chain', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()

    await playAcceptedWords(user, ['casa'])
    await playWord(user, 'Árbol')
    await screen.findByText('¡Bien! «árbol» suma 5 puntos.')
    await playAcceptedWords(user, ['luna'])

    expect(getStatValue('Puntaje')).toBe(13)
    expect(getStatValue('Palabras')).toBe(3)
    expect(getChainWords()).toEqual(['casa', 'árbol', 'luna'])
  })

  it('accepts words with ñ', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()

    await playAcceptedWords(user, ['ñandú'])

    expect(getStatValue('Puntaje')).toBe(5)
    expect(within(getNextLetterHint()).getByText('u')).toBeInTheDocument()
  })

  it('rejects a word that is not in the dictionary', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()

    await playWord(user, 'qwerty')

    expect(await screen.findByRole('alert')).toHaveTextContent(
      '«qwerty» no está en el diccionario. Probá con otra palabra.',
    )
    expect(getWordInput()).toHaveValue('qwerty')
    expect(getWordInput()).toHaveAttribute('aria-invalid', 'true')
    expect(getStatValue('Puntaje')).toBe(0)
    expect(getChainWords()).toEqual([])
  })

  it.each([
    { word: '', message: 'Escribí una palabra antes de enviar.' },
    {
      word: 'dos palabras',
      message: 'Usá solo letras, sin espacios, números ni símbolos.',
    },
    {
      word: 'casa2',
      message: 'Usá solo letras, sin espacios, números ni símbolos.',
    },
  ])(
    'rejects «$word» without asking the dictionary',
    async ({ word, message }) => {
      const fetchMock = mockDictionary(KNOWN_WORDS)
      const { user } = await renderGameScreen()

      await playWord(user, word)

      expect(screen.getByRole('alert')).toHaveTextContent(message)
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )

  it('rejects a repeated word, even with different accents', async () => {
    const fetchMock = mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()
    await playAcceptedWords(user, ['casa', 'árbol', 'luna'])
    fetchMock.mockClear()

    await playWord(user, 'arbol')

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Ya usaste «arbol» en esta partida. Probá con otra palabra.',
    )
    expect(fetchMock).not.toHaveBeenCalled()
    expect(getStatValue('Palabras')).toBe(3)
  })

  it('rejects a word that does not start with the last letter', async () => {
    const fetchMock = mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()
    await playAcceptedWords(user, ['casa'])
    fetchMock.mockClear()

    await playWord(user, 'luna')

    expect(screen.getByRole('alert')).toHaveTextContent(
      '«luna» no empieza con «a». Probá con otra palabra.',
    )
    expect(fetchMock).not.toHaveBeenCalled()
    expect(getChainWords()).toEqual(['casa'])
  })

  it('treats ñ as a different letter from n', async () => {
    mockDictionary(KNOWN_WORDS)
    const { user } = await renderGameScreen()
    await playAcceptedWords(user, ['pan'])

    await playWord(user, 'ñandú')

    expect(screen.getByRole('alert')).toHaveTextContent(
      '«ñandú» no empieza con «n». Probá con otra palabra.',
    )

    await playAcceptedWords(user, ['nube'])

    expect(getChainWords()).toEqual(['pan', 'nube'])
  })

  it('lets the player send the word again when the dictionary cannot be reached', async () => {
    mockDictionaryReply(() =>
      Promise.reject(new TypeError('Failed to fetch')),
    )
    const { user } = await renderGameScreen()

    await playWord(user, 'casa')

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No pudimos validar «casa». Revisá tu conexión y volvé a enviarla.',
    )
    expect(getChainWords()).toEqual([])

    mockDictionary(KNOWN_WORDS)
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(
      await screen.findByText('¡Bien! «casa» suma 4 puntos.'),
    ).toBeInTheDocument()
  })

  it('brings the focus back to the word input', async () => {
    const { user } = await renderGameScreen()

    await user.click(document.body)

    await waitFor(() => expect(getWordInput()).toHaveFocus())
  })
})
