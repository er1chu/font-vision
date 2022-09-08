import { NextApiRequest, NextApiResponse } from 'next'

export default async function serverSideCall(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = `https://fontsinuse.com/api/1/uses.json?api_key=${process.env.API_KEY}&app_name=${process.env.API_APP_ID}`
  const response = await fetch(baseUrl).then((response) => response.json())
  res.status(200).json(response)
}
