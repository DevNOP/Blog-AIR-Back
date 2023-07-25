import express from 'express'
import { body } from 'express-validator'
import { ReadPostController } from '../usecases/users/read-posts/read-post-controller'
import { CreatePostController } from '../usecases/users/create-post/create-post-controller'

export const routerUser = express.Router()

const readPostController = new ReadPostController()
const createPostController = new CreatePostController()

routerUser.get('/', readPostController.execute)

routerUser.post(
  '/',
  [body('author').isString().notEmpty()],
  [body('data').isString().notEmpty()],
  [body('image').isString().isURL()],
  createPostController.execute,
)
