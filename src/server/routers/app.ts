import { zodiosNextApp } from '@zodios/express'
import { usesRouter } from '@/server/routers/uses'
import { entitiesRouter } from '@/server/routers/entities'

export const app = zodiosNextApp()
app.use('/api', usesRouter, entitiesRouter)
