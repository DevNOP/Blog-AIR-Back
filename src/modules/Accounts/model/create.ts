import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export type User = {
  name: string
  email: string
  password?: string
  imageURL: string
  bio?: string
  idGit?: number
  linkedinUrl?: string
  githubUrl?: string
}
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
      console.log(error)
      throw new Error("Couldn't create user")
    }
  }
}

export default new CreateAccountModel()
