import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class DeletePostModel {
  async deletePostById(id: string) {
    await prisma.post.delete({
      where: {
        id,
      },
    })
  }
}

export default new DeletePostModel()
