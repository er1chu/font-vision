import { zodiosNextApp } from '@zodios/express'
import { usesRouter } from './uses'

export const app = zodiosNextApp()
app.use('/api', usesRouter)
