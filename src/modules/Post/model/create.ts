import { PrismaClient } from '@prisma/client'
import { Tpost } from '../types/Tpost'
const prisma = new PrismaClient()

class CreatePostModel {
  async createPost(
    userId: string,
    title: string,
    data: string,
    imageURL: string,
  ) {
    const result: Tpost = await prisma.post.create({
      data: {
        userId,
        title,
        data,
        imageURL,
      },
    })

    return result
  }
}

export default new CreatePostModel()
