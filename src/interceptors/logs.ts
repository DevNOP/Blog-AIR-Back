import { NextFunction, Request, Response } from 'express'

export function logActionsUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`👀 ${req.method} - user${req.path} `)

  next()
}
