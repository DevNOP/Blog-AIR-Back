import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

type Timer = '1h' | '30m'

export function createTokenService(name: string, email: string, time: Timer) {
  if (process.env.PRIVATE_KEY_JWT) {
    const token = sign({ email }, process.env.PRIVATE_KEY_JWT, {
      expiresIn: time,
      subject: name,
    })
    return token
  } else {
    throw new Error('Error when creating token')
  }
}
