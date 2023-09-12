import bcrypt from 'bcrypt'

import { createTokenService } from '../create-token/create-token-service'
import readAccountModel from '../../../Account/model/read'

class LoginService {
  async execute(email: string, password: string) {
    try {
      const user = await readAccountModel.findAccountByEmail(email)

      if (!user) {
        return { status: false, error: 'Email/Senha incorreto' }
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return { status: false, error: 'Email/Senha incorreto' }
      }

      const loginToken = createTokenService(user.name, email, '1h')

      return { status: true, data: { loginToken, user } }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new LoginService()
