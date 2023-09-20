import { NextFunction, Request, Response } from 'express'
import { verifyTokenService } from '../modules/Auth/services/verify-token/verify-token-service'

export function middleAuthToke(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const verifyToken = verifyTokenService(token)

    if (verifyToken) {
      return next()
    }

    return res.status(401).json({ message: 'Token invalid' })
  } else {
    return res.status(401).json({ message: 'Token not found' })
  }
}
