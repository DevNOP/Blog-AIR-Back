import { Request, Response } from 'express'

import loginService from './services/login/login-service'

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const result = await loginService.execute(email, password)

      if (result.status === false) {
        return res.status(400).json({ message: result })
      }

      return res.send(result.data).status(201)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
