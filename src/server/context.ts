import { zodiosContext } from '@zodios/express'
import z from 'zod'
import { usesResults } from '../common/api'

// const user = z.object({
//   id: z.number(),
//   name: z.string(),
//   email: z.string().email(),
// })

// export const ctx = zodiosContext(z.object({ user }))
export const ctx = zodiosContext(z.object({ usesResults }))
