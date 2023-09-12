import express from 'express'
import { body, param } from 'express-validator'

import { validationReq } from './scripts/validationReq'

import { PostController } from '../modules/Post/post.controller'
import { AccountController } from '../modules/Account/account.controller'
import { AuthController } from '../modules/Auth/auth.controller'

export const routerUser = express.Router()

const postController = new PostController()
const accountController = new AccountController()
const authController = new AuthController()

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

routerUser.post('/registerGithub', accountController.createAccountForGithub)

routerUser.post(
  '/createUser',
  [body('name').isString().notEmpty()],
  [body('email').isString().notEmpty()],
  [body('password').isString().notEmpty()],
  validationReq,
  accountController.createUser,
)

routerUser.post(
  '/login',
  [body('email').isString().notEmpty()],
  [body('password').isString().notEmpty()],
  validationReq,
  authController.login,
)

routerUser.post(
  '/forgot-password',
  [body('name').isString().notEmpty()],
  [body('email').isString().notEmpty()],
  validationReq,
  accountController.putResetPassword,
)

routerUser.post(
  '/reset-password',
  [body('token').isString().notEmpty()],
  [body('newPassword').isString().notEmpty()],
  validationReq,
  accountController.putResetPassword,
)
