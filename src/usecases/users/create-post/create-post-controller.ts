import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import createPostService from './create-post-service'

export class CreatePostController {
  async execute(req: Request, res: Response) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0],
      })
    }

    const { author, data, image } = req.body

    try {
      const result = await createPostService.execute(author, data, image)

      return res.send(result.data).status(201)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
