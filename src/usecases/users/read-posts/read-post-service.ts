import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
class ReadPostService {
  async execute() {
    try {
      const result = await prisma.posts.findMany()
      return { status: true, data: result }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new ReadPostService()
