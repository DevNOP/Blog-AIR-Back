import { validationResult } from 'express-validator/src/validation-result'
import { Request, Response } from 'express'
import deletePostService from './delete-post-service'

export class DeletePostController {
  async execute(req: Request, res: Response) {
    const { id } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] })
    }

    try {
      const result = await deletePostService.execute(id)
      return res.status(200).send(result)
    } catch (error) {
      res.status(404).send(error)
    }
  }
}
