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

    const result = await createPostService.execute(author, data, image)

    if (result.status === false) {
      return res.status(400).send(result.error)
    }

    return res.send(result.data).status(200)
  }
}
