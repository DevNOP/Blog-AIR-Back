import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class CreatePostService {
  async execute(author: string, data: string, image: string) {
    // Validar se o texto não exite no banco.
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
      return { status: false, error }
    }
  }
}

export default new CreatePostService()
