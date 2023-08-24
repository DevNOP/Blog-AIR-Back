import { Request, Response } from 'express'
import getTokenDataGithubService from './services/get-token-data-github/get-token-data-github-service'

interface RequestCode {
  code: string
}

export class AccountController {
  async createAccountForGithub(req: Request, res: Response) {
    const { code } = req.query as unknown as RequestCode

    try {
      const result = await getTokenDataGithubService.getAccessToken(code)
      return res.send(result).status(201)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
