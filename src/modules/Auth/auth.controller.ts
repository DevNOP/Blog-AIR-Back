import { createTokenService } from './services/create-token/create-token-service'
import { Request, Response } from 'express'
import { verifyTokenService } from './services/verify-token/verify-token-service'

export class AuthController {
  async createTokenTest(req: Request, res: Response) {
    const tokenTest = createTokenService(req.body.name)
    return res.send(tokenTest)
  }

  async verifyTokenTest(req: Request, res: Response) {
    const result = verifyTokenService(req.body.token)
    return res.send(result)
  }
}
