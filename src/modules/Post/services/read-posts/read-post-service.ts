import ReadPostModel from '../../model/read'

class ReadPostService {
  async execute() {
    try {
      const result = await ReadPostModel.findAllPosts()
      return { status: true, data: result }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new ReadPostService()
