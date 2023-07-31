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
      return { status: false, error: 'Post not found' }
    }

    try {
      await prisma.posts.delete({
        where: {
          id,
        },
      })
      return { status: true, message: 'Post deleted !!' }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new DeletePostService()
