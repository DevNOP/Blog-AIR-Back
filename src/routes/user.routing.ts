import express from 'express'
import { body } from 'express-validator'
import { DeletePostController } from '../usecases/users/delete-post/delete-post-controller'
import { ReadPostController } from '../usecases/users/read-posts/read-post-controller'

export const routerUser = express.Router()

const readPostController = new ReadPostController()
const deletePostController = new DeletePostController()

routerUser.get('/', readPostController.execute)
routerUser.delete('/', [body('id').isUUID()], deletePostController.execute)
