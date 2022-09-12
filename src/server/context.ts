import { zodiosContext } from '@zodios/express'
import z from 'zod'
import { usesResults } from '@/common/api'
// export const ctx = zodiosContext(z.object({ user }))
export const ctx = zodiosContext(z.object({ usesResults }))
