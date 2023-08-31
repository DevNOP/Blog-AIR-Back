import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

class CreateUserService {
  async execute(
    name: string,
    email: string,
    password: string,
    imageURL: string,
  ) {
    try {
      const userExist = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (userExist) {
        return { status: false, error: 'Este email ja está sendo usado' }
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const createUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          imageURL,
        },
      })
      return { status: true, data: createUser }
    } catch (error) {
      console.error('Erro ao criar o usuário:', error)
      return { status: false, error: 'Erro ao criar o usuário:' }
    }
  }
}

export default new CreateUserService()
