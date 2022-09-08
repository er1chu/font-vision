import { usesCtx } from '../context'
import { usesResultsApi } from '../../common/api'

const uses = async () => {
  const baseUrl = `https://fontsinuse.com/api/1/uses.json?api_key=${process.env.API_KEY}&app_name=${process.env.API_APP_ID}`
  await fetch(baseUrl).then((response) => response.json())
}

export const usesRouter = usesCtx.router(usesResultsApi)

usesRouter.get('/uses', (req, res) => {
  res.status(200).json(uses)
})
