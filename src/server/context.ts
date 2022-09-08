import { zodiosContext } from '@zodios/express'
import z from 'zod'
import { use } from '../common/api'

const user = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
})

export const ctx = zodiosContext(z.object({ user }))
export const usesCtx = zodiosContext(z.object({ use }))
