import express from 'express'
import { ReadPostController } from '../usecases/users/read-posts/read-post-controller'

export const routerUser = express.Router()

const readPostController = new ReadPostController()

routerUser.get('/', readPostController.execute)
