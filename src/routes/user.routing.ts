import express from 'express'
import { body, param } from 'express-validator'
import { PostController } from '../modules/Post/post.controller'
import { validationReq } from './scripts/validationReq'

export const routerUser = express.Router()

const postController = new PostController()

routerUser.get('/', validationReq, postController.readPost)

routerUser.post(
  '/',
  [body('userId').isString().notEmpty()],
  [body('title').isString().notEmpty()],
  [body('data').isString().notEmpty()],
  [body('imageURL').isString().isURL()],
  validationReq,
  postController.createPost,
)

routerUser.put(
  '/:id',
  [param('id').isUUID()],
  [body('author').isString().notEmpty()],
  [body('data').isString().notEmpty()],
  [body('image').isString().isURL()],
  validationReq,
  postController.putPost,
)

routerUser.delete(
  '/:id',
  [param('id').isUUID()],
  validationReq,
  postController.deletePost,
)
