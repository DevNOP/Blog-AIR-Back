import ReadPostModel from '../../model/read'
import DeletePostModel from '../../model/delete'

class DeletePostService {
  async execute(id: string) {
    const posts = await ReadPostModel.findPostById(id)

    if (!posts) {
      return { status: false, error: 'Post not found' }
    }

    try {
      await DeletePostModel.deletePostById(id)
      return { status: true, message: 'Post deleted !!' }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new DeletePostService()
