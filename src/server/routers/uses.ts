import { usesResultsApi } from '../../common/api'
import { zodiosRouter } from '@zodios/express'

export const usesRouter = zodiosRouter(usesResultsApi)

const baseUrl = `https://fontsinuse.com/api/1/uses.json?api_key=${process.env.API_KEY}&app_name=${process.env.API_APP_ID}`
usesRouter.get('/uses', async (req, res) => {
  const uses = await fetch(baseUrl).then((response) => response.json())
  res.status(200).json(uses)
})
