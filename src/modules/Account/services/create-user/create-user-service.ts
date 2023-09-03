import bcrypt from 'bcrypt'

import readAccountModel from '../../model/read'
import createAccountModel from '../../model/create'

class CreateUserService {
  async execute(
    name: string,
    email: string,
    password: string,
    imageURL: string,
  ) {
    try {
      const userExist = await readAccountModel.findAccountByEmail(email)

      if (userExist) {
        return { status: false, error: 'Este email ja está sendo usado' }
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await createAccountModel.createAccount({
        name,
        email,
        password: hashedPassword,
        imageURL,
      })

      return { status: true, data: user }
    } catch (error) {
      return { status: false, error: 'Erro ao criar o usuário:' }
    }
  }
}

export default new CreateUserService()
