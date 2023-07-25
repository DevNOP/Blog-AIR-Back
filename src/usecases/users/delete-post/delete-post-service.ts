import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class DeletePostService {
  async execute(id: string) {
    const posts = await prisma.posts.findMany({
      where: {
        id,
      },
    })
    if (posts.length === 0) {
      throw new Error('This post not exist')
    }

    try {
      await prisma.posts.delete({
        where: {
          id,
        },
      })
      return true
    } catch (error: string | any) {
      throw new Error(error)
    }
  }
}

export default new DeletePostService()
