import { Request, Response } from 'express';
import { IBaseResponse } from '../../commons/interface';

export interface IOrderController {
  orderBook: (req: Request, res: Response) => Promise<Response<IBaseResponse>>;
  cancelOrder: (
    req: Request,
    res: Response
  ) => Promise<Response<IBaseResponse>>;
  listOrders: (req: Request, res: Response) => Promise<Response<IBaseResponse>>;
}
