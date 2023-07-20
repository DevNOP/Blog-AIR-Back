import { Request, Response } from 'express'
import readPostService from './read-post-service'

export class ReadPostController {
  async execute(req: Request, res: Response) {
    const result = await readPostService.execute()

    if (result.status === false) {
      return res.status(400).send(result.error)
    }

    return res.send(result.data).status(200)
  }
}
