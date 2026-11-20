import type { GameScreenProps } from './interfaces.ts'

export const PLACEHOLDER_GAME: GameScreenProps = {
  playerName: 'Nacho',
  chain: ['casa', 'árbol', 'luna', 'ave', 'elefante'],
  remainingSeconds: 9,
  draftWord: 'perro',
  feedback: '«perro» no empieza con «e». Probá con otra palabra.',
}
