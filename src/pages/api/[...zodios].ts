import { app } from '../../server/routers/app'

export default app

export const config = {
  api: {
    externalResolver: true,
  },
}
