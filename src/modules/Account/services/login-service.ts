import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { createTokenService } from '../../Auth/services/create-token/create-token-service'

const prisma = new PrismaClient()

class LoginService {
  async execute(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return { status: false, error: 'Usuário não encontrado.' }
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return { status: false, error: 'Senha incorreta' }
      }

      const loginToken = createTokenService(user.name)

      return { status: true, data: { loginToken, user } }
    } catch (error) {
      console.error('Erro ao efetuar o login', error)
      return { status: false, error: 'Erro ao efetuar o login.' }
    }
  }
}

export default new LoginService()
