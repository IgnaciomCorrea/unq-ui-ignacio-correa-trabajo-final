import { z } from 'zod'
import { MAX_PLAYER_NAME_LENGTH, MIN_PLAYER_NAME_LENGTH } from './constants.ts'

export const playerNameSchema = z
  .string()
  .trim()
  .min(MIN_PLAYER_NAME_LENGTH, 'Ingresá tu nombre para empezar.')
  .max(
    MAX_PLAYER_NAME_LENGTH,
    `Usá como máximo ${MAX_PLAYER_NAME_LENGTH} caracteres.`,
  )
