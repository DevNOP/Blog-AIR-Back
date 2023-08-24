import dotenv from 'dotenv'
dotenv.config()

type userGithub = {
  login: string
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

    return { tokenData, dataUser }
  }
}

export default new GetTokenDataGithubService()
