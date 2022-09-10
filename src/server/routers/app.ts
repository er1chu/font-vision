import { zodiosNextApp } from '@zodios/express'
import { usesRouter } from './uses'
import { entitiesRouter } from './entities'

export const app = zodiosNextApp()
app.use('/api', usesRouter, entitiesRouter)
