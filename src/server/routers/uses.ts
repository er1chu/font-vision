import { usesResultsApi } from '@/common/api-types'
import { zodiosRouter } from '@zodios/express'

export const usesRouter = zodiosRouter(usesResultsApi)

const baseUrl = `https://fontsinuse.com/api/1/uses.json`

usesRouter.get('/uses', async (req, res) => {
  const query = req.query
  const { page, count } = query as { page: number; count: number }
  const requestUrl = `${baseUrl}?page=${page || 1}&count=${count || 30}&order=created&api_key=${
    process.env.API_KEY
  }&app_name=${process.env.API_APP_ID}`
  const uses = await fetch(requestUrl).then((response) => response.json())
  res.setHeader('Cache-Control', 's-maxage=10000, stale-while-revalidate=3600')
  res.status(200).json(uses)
})
