import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class CreatePostService {
  async execute(author: string, data: string, image: string) {
    try {
      const result = await prisma.posts.create({
        data: {
          author,
          data,
          image,
        },
      })
      return { status: true, data: result }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new CreatePostService()
