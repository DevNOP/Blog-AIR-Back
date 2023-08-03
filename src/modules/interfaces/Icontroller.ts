import { NextFunction, Request, Response } from 'express'

export interface Icontroller {
  validationReq(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<unknown, Record<string, unknown>>>
}
