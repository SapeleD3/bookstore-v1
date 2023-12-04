import express from 'express';
import container from '../../container.awilix';
import auth from '../../middleware/auth';
import orderValidation from '../validations/orderValidations';
import validate from '../../middleware/inputValidator';
import { IOrderController } from '../../domains/orders/interface';

const orderRouter = express.Router();

const ordersController: IOrderController =
  container.resolve('ordersController');

orderRouter.post(
  '/',
  validate(orderValidation.orderBook),
  auth,
  ordersController.orderBook
);
orderRouter.get('/', auth, ordersController.listOrders);
orderRouter.put('/', auth, ordersController.cancelOrder);

export default orderRouter;
