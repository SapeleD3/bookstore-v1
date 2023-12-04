import { IOrderController } from './interface';
import OrdersService from './service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { defaultCatchBlock } from '../../commons/constants';
import { AuthRequest } from '../../middleware/interface';

export default class OrdersController implements IOrderController {
  private ordersService;

  constructor({ ordersService }: { ordersService: OrdersService }) {
    this.ordersService = ordersService;
  }

  orderBook = async (req: AuthRequest, res: Response) => {
    const { cartItems } = req.body;
    try {
      const response = await this.ordersService.orderBook({
        cartItems,
        userId: req?.id || '',
      });
      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'order successful',
        data: response,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  cancelOrder = async (req: AuthRequest, res: Response) => {
    try {
      const { id = '' } = req.query as unknown as { id: string };

      const response = await this.ordersService.cancelOrder(req?.id || '', id);
      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'order cancelled successful',
        data: response,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  listOrders = async (req: AuthRequest, res: Response) => {
    try {
      const response = await this.ordersService.listOrders(req?.id);

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'orders fetched successfully',
        data: response,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };
}
