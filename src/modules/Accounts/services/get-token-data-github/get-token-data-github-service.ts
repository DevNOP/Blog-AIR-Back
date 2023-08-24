import dotenv from 'dotenv'
import CreateAccountModel, { User } from '../../model/create'

dotenv.config()

type userGithub = {
  html_url: string
  id: number
  avatar_url: string
  url: string
  name: string
  location: string
  email: string
  bio: string
}

type tokenGithub = {
  access_token: string
  scope: string
  token_type: string
}

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

    if (!tokenGithub.ok) {
      throw new Error('Failed to fetch GitHub token')
    }

    const tokenData: tokenGithub = await tokenGithub.json() // Esperar pela resposta e transformar em JSON

    const dataUser: userGithub = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + tokenData.access_token,
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })

    const user: User = {
      name: dataUser.name,
      email: dataUser.email,
      imageURL: dataUser.avatar_url,
      bio: dataUser.bio,
      idGit: dataUser.id,
      githubUrl: dataUser.html_url,
    }

    try {
      const result = await CreateAccountModel.createAccount(user)

      return { status: true, data: result }
    } catch (error) {
      throw new Error('Error when creating user')
    }
  }
}

export default new GetTokenDataGithubService()
