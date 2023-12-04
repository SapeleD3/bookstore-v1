import { Request, Response } from 'express';
import { IBaseResponse } from '../../commons/interface';

export interface IBookController {
  listBooks: (req: Request, res: Response) => Promise<Response<IBaseResponse>>;
}
