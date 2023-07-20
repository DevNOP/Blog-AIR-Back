import { Iservices } from './../interfaces/services-interface'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
class ReadPostService implements Iservices {
  async execute() {
    try {
      const result = await prisma.posts.findMany()
      return { status: true, data: result }
    } catch (error) {
      return { status: false, error: 'Failed connection with DB' }
    }
  }
}

export default new ReadPostService()
