import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UpdatePostModel {
  async updatePostById(
    id: string,
    userId: string,
    title: string,
    data: string,
    imageURL: string,
  ) {
    const result = await prisma.post.update({
      where: {
        id,
      },
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

export default new UpdatePostModel()
