import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

class CreateUserModel {
  async execute(
    id: string,
    name: string,
    email: string,
    password: string,
    imageURL: string,
    permissionsId: string,
  ) {
    try {
      const userExist = await prisma.user.findUnique({
        where: {
          id,
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
          permissionsId,
        },
      })
      return { status: true, data: createUser }
    } catch (error) {
      console.error('Erro ao criar o usuário:', error)
      return { status: false, error: 'Erro ao criar o usuário:' }
    }
  }
}

export default new CreateUserModel()
