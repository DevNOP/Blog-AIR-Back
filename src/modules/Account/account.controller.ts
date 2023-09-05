import { Request, Response } from 'express'

import getTokenDataGithubService from './services/create-user-for-github/create-user-for-github'
import createUserService from './services/create-user/create-user-service'
import putPasswordService from './services/put-password/put-password-service'
import putResetPasswordService from './services/put-password/put-reset-password-service'

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

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body

    try {
      const result = await createUserService.execute(name, email, password)
      if (result.status === false) {
        return res.status(400).json({ message: result })
      }

      return res.send(result.data).status(201)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async putPassword(req: Request, res: Response) {
    const { name, email } = req.body
    try {
      const result = await putPasswordService.initiatePasswordReset(name, email)
      if (result.status === false) {
        return res.status(400).json({ message: result })
      }

      return res.send(result.message).status(201)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async putResetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body

    try {
      const result = await putResetPasswordService.resetPassword(
        token,
        newPassword,
      )
      if (result.status === false) {
        return res.status(400).json({ message: result })
      }

      return res.send(result.message).status(201)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
