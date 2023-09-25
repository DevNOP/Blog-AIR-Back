import dotenv from 'dotenv'
import { verify } from 'jsonwebtoken'

dotenv.config()

export function verifyTokenService(token: string) {
  try {
    if (process.env.PRIVATE_KEY_JWT) {
      verify(token, process.env.PRIVATE_KEY_JWT)
      return true
    }
  } catch (e) {
    return false
  }
}
