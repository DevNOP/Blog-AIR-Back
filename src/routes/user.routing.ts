import express from 'express'
import { body, param } from 'express-validator'
import { PostController } from '../modules/Post/post.controller'

export const routerUser = express.Router()

const postController = new PostController()

routerUser.get('/', postController.validationReq, postController.readPost)

routerUser.post(
  '/',
  [body('author').isString().notEmpty()],
  [body('data').isString().notEmpty()],
  [body('image').isString().isURL()],
  postController.validationReq,
  postController.createPost,
)

routerUser.put(
  '/:id',
  [param('id').isUUID()],
  [body('author').isString().notEmpty()],
  [body('data').isString().notEmpty()],
  [body('image').isString().isURL()],
  postController.validationReq,
  postController.putPost,
)

routerUser.delete(
  '/:id',
  [param('id').isUUID()],
  postController.validationReq,
  postController.deletePost,
)
