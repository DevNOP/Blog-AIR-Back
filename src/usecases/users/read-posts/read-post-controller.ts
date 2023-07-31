import { Request, Response } from 'express'
import readPostService from './read-post-service'

export class ReadPostController {
  async execute(req: Request, res: Response) {
    try {
      const result = await readPostService.execute()

      return res.send(result.data).status(200)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
