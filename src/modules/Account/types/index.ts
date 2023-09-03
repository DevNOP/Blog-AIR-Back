export type userGithub = {
  html_url: string
  id: number
  avatar_url: string
  url: string
  name: string
  location: string
  email: string
  bio: string
}

export type tokenGithub = {
  access_token: string
  scope: string
  token_type: string
}

export type User = {
  name: string
  email: string
  password?: string
  imageURL: string
  bio?: string
  idGit?: number
  linkedinUrl?: string
  githubUrl?: string
}
