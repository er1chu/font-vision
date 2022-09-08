import { ctx } from '../context'
import { usesRouter } from './uses'

export const app = ctx.nextApp()
app.use('/api', usesRouter)
