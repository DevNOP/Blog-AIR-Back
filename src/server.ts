import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { routerUser } from './routes/user.routing'
import { logActionsUser } from './interceptors/logs'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', logActionsUser, routerUser)

app.listen(port, () => {
  console.log(`🔥 Server is  running at http://localhost:${port}`)
})
