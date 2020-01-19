import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import { AppRouter } from './AppRouter'
import './controllers/LoginController'
import './controllers/RootController'

const app = express()

const PORT = 3000

app.use(cookieSession({ keys: [''] }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(AppRouter.getInstance())


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
