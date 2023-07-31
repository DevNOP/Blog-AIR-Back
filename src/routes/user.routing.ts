import express from 'express'
import { body, param } from 'express-validator'
import { DeletePostController } from '@usecases/users/delete-post/delete-post-controller'
import { ReadPostController } from '../usecases/users/read-posts/read-post-controller'
import { CreatePostController } from '../usecases/users/create-post/create-post-controller'
import { PutPostController } from '../usecases/users/put-post/put-post-controller'

export const routerUser = express.Router()

const readPostController = new ReadPostController()
const createPostController = new CreatePostController()
const deletePostController = new DeletePostController()
const putPostController = new PutPostController()

routerUser.get('/', readPostController.execute)

routerUser.post(
  '/',
  [body('author').isString().notEmpty()],
  [body('data').isString().notEmpty()],
  [body('image').isString().isURL()],
  createPostController.execute,
)

routerUser.put(
  '/:id',
  [param('id').isUUID()],
  [body('author').isString().notEmpty()],
  [body('data').isString().notEmpty()],
  [body('image').isString().isURL()],
  putPostController.execute,
)

routerUser.delete('/:id', [param('id').isUUID()], deletePostController.execute)
