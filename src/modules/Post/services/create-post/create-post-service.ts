import CreatePostModel from '../../model/create'
import { Tpost } from '../../types/Tpost'

class CreatePostService {
  async execute({ userId, data, title, imageURL }: Tpost) {
    try {
      const result = await CreatePostModel.createPost(
        userId,
        title,
        data,
        imageURL,
      )
      return { status: true, data: result }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new CreatePostService()
