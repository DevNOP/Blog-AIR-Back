import { prisma } from '../../Prisma/index'

class ReadAuthModel {
  async findUserByIdGithub(idGithub: number) {
    try {
      const result = await prisma.user.findUnique({
        where: {
          idGit: idGithub,
        },
        select: {
          id: true,
          name: true,
          email: true,
          imageURL: true,
          linkedinUrl: true,
          githubUrl: true,
          bio: true,
        },
      })

      return result
    } catch (error) {
      throw new Error("Couldn't find user by idGithub")
    }
  }
}

export default new ReadAuthModel()