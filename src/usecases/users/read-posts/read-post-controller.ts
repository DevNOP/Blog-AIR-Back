import { Request, Response } from 'express'
import ReadPostService from './read-post-service'

export class ReadPostController {
  async execute(req: Request, res: Response) {
    const test = await ReadPostService.execute()
    return res.send(test).status(200)
  }
}
