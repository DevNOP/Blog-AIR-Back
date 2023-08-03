import CreatePostModel from '../../model/create'

class CreatePostService {
  async execute(author: string, data: string, image: string) {
    try {
      const result = await CreatePostModel.createPost(author, data, image)
      return { status: true, data: result }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new CreatePostService()
