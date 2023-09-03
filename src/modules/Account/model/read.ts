import { prisma } from '../../Prisma/index'

class ReadAccountModel {
  async findAccountByEmail(email: string) {
    try {
      const result = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      return result
    } catch (error) {
      throw new Error("Couldn't find user by email")
    }
  }
}

export default new ReadAccountModel()
