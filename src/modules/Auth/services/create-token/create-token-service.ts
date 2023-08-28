import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function createTokenService(name: string) {
  if (process.env.PRIVATE_KEY_JWT) {
    const token = sign({}, process.env.PRIVATE_KEY_JWT, {
      expiresIn: '1h',
      subject: name,
    })
    return token
  }
}
