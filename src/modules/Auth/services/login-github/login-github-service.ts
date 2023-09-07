import getTokenDataGithubService from '../../../Account/services/create-user-for-github/create-user-for-github'
import readAuthModel from '../../model/read'
import { createTokenService } from '../create-token/create-token-service'

class LoginGithubService {
  async execute(code: string) {
    try {
      const tokenGithub = await getTokenDataGithubService.getAccessToken(code)

      const userGithub = await getTokenDataGithubService.getUserInfo(
        tokenGithub.access_token,
      )

      const user = await readAuthModel.findUserByIdGithub(userGithub.id)

      if (!user) {
        throw new Error('User not found')
      }

      const token = createTokenService(user.name)
      return { status: true, data: { userInfo: user, token } }
    } catch (error: any) {
      return { status: false, data: error.message }
    }
  }
}

export default new LoginGithubService()
