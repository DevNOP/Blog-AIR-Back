import ReadPostModel from '../../model/read'
import UpdatePostModel from '../../model/update'

class PutPostService {
  async execute(id: string, author: string, data: string, image: string) {
    try {
      const posts = await ReadPostModel.findPostById(id)

      if (!posts) {
        return { status: false, error: 'Post not found' }
      }
      const result = await UpdatePostModel.updatePostById(
        id,
        author,
        data,
        image,
      )

      return { status: true, data: result }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new PutPostService()
