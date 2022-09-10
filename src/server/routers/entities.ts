import { entitiesResultsApi } from '../../common/api'
import { zodiosRouter } from '@zodios/express'

export const entitiesRouter = zodiosRouter(entitiesResultsApi)

const baseUrl = `https://fontsinuse.com/api/1/typesets/typeentities?count=20&page=1&sort=released&order=desc&api_key=${process.env.API_KEY}&app_name=${process.env.API_APP_ID}`
entitiesRouter.get('/entities', async (req, res) => {
  const entities = await fetch(baseUrl).then((response) => response.json())
  res.setHeader('Cache-Control', 's-maxage=10000, stale-while-revalidate=3600')
  res.status(200).json(entities)
})
