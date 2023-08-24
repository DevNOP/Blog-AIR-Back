import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class LoginService {
  async execute(id: string, email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
          email,
        },
      })

      if (user === null) {
        return { status: false, error: 'Não foi possível encontrar o usuário' }
      }

      if (!user) {
        return { status: false, error: 'Usuário não encontrado.' }
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return { status: false, error: 'Senha incorreta' }
      }

      return { status: true, data: user }
    } catch (error) {
      console.error('Erro ao efetuar o login', error)
      return { status: false, error: 'Erro ao efetuar o login.' }
    }
  }
}

export default new LoginService()
