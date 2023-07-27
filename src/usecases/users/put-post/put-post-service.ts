import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class PutPostService {
  async execute(id: string, author: string, data: string, image: string) {
    try {
      const posts = await prisma.posts.findUnique({
        where: {
          id,
        },
      })

      if (!posts) {
        return { status: false, error: 'Post not found' }
      }
      const updatePost = await prisma.posts.update({
        where: {
          id,
        },
        data: {
          author,
          data,
          image,
        },
      })

      return { status: true, data: updatePost }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new PutPostService()
