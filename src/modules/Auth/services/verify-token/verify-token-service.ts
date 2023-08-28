import dotenv from 'dotenv'
import { verify } from 'jsonwebtoken'

dotenv.config()

export function verifyTokenService(token: string) {
  try {
    if (process.env.PRIVATE_KEY_JWT) {
      verify(token, process.env.PRIVATE_KEY_JWT)
      return 'Autorizado'
    }
  } catch {
    return 'Não autorizado'
  }
}
