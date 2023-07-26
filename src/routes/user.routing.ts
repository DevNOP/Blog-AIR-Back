import express from 'express'
import { body } from 'express-validator'
import { DeletePostController } from '../usecases/users/delete-post/delete-post-controller'
import { ReadPostController } from '../usecases/users/read-posts/read-post-controller'
import { CreatePostController } from '../usecases/users/create-post/create-post-controller'

export const routerUser = express.Router()

const readPostController = new ReadPostController()
const createPostController = new CreatePostController()
const deletePostController = new DeletePostController()




routerUser.get('/', readPostController.execute)

routerUser.post(
  '/',
  [body('author').isString().notEmpty()],
  [body('data').isString().notEmpty()],
  [body('image').isString().isURL()],
  createPostController.execute,
)

routerUser.delete('/', [body('id').isUUID()], deletePostController.execute)

