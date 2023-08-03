import { PrismaClient } from '@prisma/client'
import { Tpost } from '../types/Tpost'
const prisma = new PrismaClient()

class CreatePostModel {
  async createPost(author: string, data: string, image: string) {
    const result: Tpost = await prisma.posts.create({
      data: {
        author,
        data,
        image,
      },
    })

    return result
  }
}

export default new CreatePostModel()
