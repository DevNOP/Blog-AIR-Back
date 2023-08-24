import CreateUserModal from '../model/createUser'

class CreateUserService {
  async execute(
    id: string,
    name: string,
    email: string,
    password: string,
    imageURL: string,
    permissionsId: string,
  ) {
    try {
      const result = await CreateUserModal.execute(
        id,
        name,
        email,
        password,
        imageURL,
        permissionsId,
      )
      return { status: true, data: result }
    } catch (error) {
      throw new Error()
    }
  }
}

export default new CreateUserService()
