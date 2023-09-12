import { Request, Response } from 'express'

import getTokenDataGithubService from './services/create-user-for-github/create-user-for-github'
import createUserService from './services/create-user/create-user-service'
import putResetPasswordService from './services/put-password/put-reset-password-service'

import { RequestCode } from './types'


export class AccountController {
  async createAccountForGithub(req: Request, res: Response) {
    const { code } = req.query as unknown as RequestCode

    try {
      const result = await getTokenDataGithubService.registerUser(code)
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

  async initPasswordReset(req: Request, res: Response) {
    const { name, email } = req.body
    try {
      const result = await putResetPasswordService.initiatePasswordReset(
        name,
        email,
      )
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
