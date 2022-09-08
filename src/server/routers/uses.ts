import { ctx } from '../context'
import { usesResultsApi } from '../../common/api'
import { NextApiRequest, NextApiResponse } from 'next'

const usesService = async () => {
  const baseUrl = `https://fontsinuse.com/api/1/uses.json?api_key=${process.env.API_KEY}&app_name=${process.env.API_APP_ID}`
  const response = await fetch(baseUrl).then((response) => response.json())
  return response
}

export const usesRouter = ctx.router(usesResultsApi)

usesRouter.get('/uses', async (req, res) => {
  const uses = await usesService()
  res.status(200).json(uses)
})
