import { z } from 'zod'

export const wordValidationResponseSchema = z.object({
  exists: z.boolean(),
})
