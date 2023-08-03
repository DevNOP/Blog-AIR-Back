import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UpdatePostModel {
  async updatePostById(
    id: string,
    author: string,
    data: string,
    image: string,
  ) {
    const result = await prisma.posts.update({
      where: {
        id,
      },
      data: {
        author,
        data,
        image,
      },
    })

    return result
  }
}

export default new UpdatePostModel()
