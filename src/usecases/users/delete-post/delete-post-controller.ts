import { validationResult } from 'express-validator/src/validation-result'
import { Request, Response } from 'express'
import deletePostService from './delete-post-service'

export class DeletePostController {
  async execute(req: Request, res: Response) {
    const { id } = req.params

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] })
    }

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
