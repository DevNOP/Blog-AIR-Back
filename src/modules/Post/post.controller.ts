import { Tpost } from './types/Tpost'
import { Request, Response } from 'express'

import createPostService from './services/create-post/create-post-service'
import readPostService from './services/read-posts/read-post-service'
import putPostService from './services/put-post/put-post-service'
import deletePostService from './services/delete-post/delete-post-service'
import createUserService from '../Account/services/create-user-service'
import { validationResult } from 'express-validator'
import loginService from '../Account/services/login-service'

export class PostController {
  async createPost(req: Request, res: Response) {
    const { userId, title, data, imageURL, id }: Tpost = req.body

    try {
      const result = await createPostService.execute({
        id,
        data,
        imageURL,
        title,
        userId,
      })

      return res.send(result.data).status(201)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async readPost(req: Request, res: Response) {
    try {
      const result = await readPostService.execute()

      return res.send(result.data).status(200)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async putPost(req: Request, res: Response) {
    const { id } = req.params
    const { userId, title, data, imageURL } = req.body

    try {
      const result = await putPostService.execute(
        id,
        userId,
        title,
        data,
        imageURL,
      )

      if (result.status === false) {
        return res.status(404).json({ message: result.error })
      }

      return res.send(result.data).status(200)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async deletePost(req: Request, res: Response) {
    const { id } = req.params

    try {
      const result = await deletePostService.execute(id)

      if (result.status === false) {
        return res.status(400).json({ message: result.error })
      }

      return res.status(200).json({ message: result.message })
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async createUser(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0],
      })
    }

    const { name, email, password, imageURL } = req.body

    try {
      const result = await createUserService.execute(
        name,
        email,
        password,
        imageURL,
      )
      if (result.status === false) {
        return res.status(400).json({ message: result })
      }

      return res.send(result.data).status(201)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const result = await loginService.execute(email, password)
      if (result.status === false) {
        return res.status(400).json({ message: result })
      }
      return res.send(result.data).status(201)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
