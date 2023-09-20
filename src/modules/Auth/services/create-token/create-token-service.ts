import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

type Timer = '1h' | '30m'
type Audience = 'admin' | 'user'

export function createTokenService(
  name: string,
  email: string | null,
  time: Timer,
  cargo: Audience,
) {
  if (process.env.PRIVATE_KEY_JWT) {
    const token = sign({ email }, process.env.PRIVATE_KEY_JWT, {
      expiresIn: time,
      subject: name,
      audience: cargo,
    })
    return token
  } else {
    throw new Error('Error when creating token')
  }
}
