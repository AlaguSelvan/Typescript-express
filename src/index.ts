import express, { Request, Response } from 'express'
import { router } from './routes/loginRoutes'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

const app = express()

const PORT = 3000
app.use(cookieSession({ keys: [''] }))
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
app.use(router)
