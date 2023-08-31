import CreateUserService from '../services/create-user-service'

class CreateUserModel {
  async createUser(
    name: string,
    email: string,
    password: string,
    imageURL: string,
  ) {
    try {
      const result = await CreateUserService.execute(
        name,
        email,
        password,
        imageURL,
      )
      return { status: true, data: result }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new CreateUserModel()
