import { Request, Response } from 'express'

import createPostService from './services/create-post/create-post-service'
import readPostService from './services/read-posts/read-post-service'
import putPostService from './services/put-post/put-post-service'
import deletePostService from './services/delete-post/delete-post-service'

export class PostController {
  async createPost(req: Request, res: Response) {
    const { author, data, image } = req.body

    try {
      const result = await createPostService.execute(author, data, image)

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
    const { author, data, image } = req.body

    try {
      const result = await putPostService.execute(id, author, data, image)

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
}
