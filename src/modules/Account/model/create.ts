import { User } from './../types/index'
import { prisma } from '../../Prisma/index'

class CreateAccountModel {
  async createAccount(user: User) {
    try {
      const result = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          imageURL: user.imageURL,
          bio: user.bio,
          idGit: user.idGit,
          githubUrl: user.githubUrl,
          linkedinUrl: user.linkedinUrl,
        },
      })
      return result
    } catch (error) {
      throw new Error("Couldn't create user")
    }
  }
}

export default new CreateAccountModel()
