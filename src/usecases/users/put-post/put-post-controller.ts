import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import putPostService from './put-post-service'

export class PutPostController {
  async execute(req: Request, res: Response) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0],
      })
    }
    const id = req.params.id
    const { author, data, image } = req.body

    try {
      const result = await putPostService.execute(id, author, data, image)
      if (result.status === false) {
        return res.status(400).send(result.error)
      }
      return res.send(result.data).status(200)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor.' })
    }
  }
}
