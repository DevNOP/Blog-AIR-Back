import { PrismaClient } from '@prisma/client'
import { Tpost } from '../types/Tpost'

const prisma = new PrismaClient()

class ReadPostModel {
  async findAllPosts() {
    const result: Array<Tpost> = await prisma.posts.findMany()
    return result
  }

  async findPostById(id: string) {
    const result = await prisma.posts.findUnique({
      where: {
        id,
      },
    })

    return result
  }
}

export default new ReadPostModel()
