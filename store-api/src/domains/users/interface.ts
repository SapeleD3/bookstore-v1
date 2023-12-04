import { Request, Response } from 'express';
import { IBaseResponse } from '../../commons/interface';

export interface IUserController {
  registerUser: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
  userLogin: (req: Request, res: Response) => Promise<Response<IBaseResponse>>;
  getAuthUser: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
}
