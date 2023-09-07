import dotenv from 'dotenv'
import CreateAccountModel from '../../model/create'

import { tokenGithub, userGithub, User } from '../../types/index'

dotenv.config()

class GetTokenDataGithubService {
  async getAccessToken(code: string) {
    const params =
      '?client_id=' +
      process.env.CLIENT_ID_Github +
      '&client_secret=' +
      process.env.CLIENT_SECRET_Github +
      '&code=' +
      code

    const tokenGithub = await fetch(
      'https://github.com/login/oauth/access_token' + params,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const tokenData: tokenGithub = await tokenGithub.json()

    return tokenData
  }

  async getUserInfo(token: string) {
    const userInfo = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    const userData: userGithub = await userInfo.json()
    return userData
  }

  async registerUser(code: string) {
    try {
      const tokenData = await this.getAccessToken(code)
      const userInfo = await this.getUserInfo(tokenData.access_token)

      const user: User = {
        name: userInfo.name,
        email: userInfo.email,
        imageURL: userInfo.avatar_url,
        bio: userInfo.bio,
        idGit: userInfo.id,
        githubUrl: userInfo.html_url,
      }

      const result = await CreateAccountModel.createAccount(user)

      return { status: true, data: result }
    } catch (error) {
      throw new Error('Error when creating user')
    }
  }
}

export default new GetTokenDataGithubService()
