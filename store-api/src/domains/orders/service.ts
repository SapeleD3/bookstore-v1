import dayjs from 'dayjs';
import { xPrisma } from '../../commons/database';
import { OrderBookPayload } from './types';

export default class OrdersService {
  private ordersRepository = xPrisma.order;
  private userRepository = xPrisma.user;

  orderBook = async (payload: OrderBookPayload) => {
    const { cartItems, userId } = payload;
    try {
      const user = await this.userRepository.findFirst({
        where: { id: userId },
      });

      if (cartItems.length < 1) {
        throw new Error('invalid order: no cart item');
      }

      const totalPrice = cartItems.reduce((agg: number, next: any) => {
        const { quantity, price } = next;
        agg += price * quantity;

        return agg;
      }, 0);

      if (totalPrice > (user?.balance || 0)) {
        throw new Error(
          'invalid order: cart items cost exceed your current balance '
        );
      }

      const orders = await this.ordersRepository.create({
        data: {
          userId,
          details: cartItems,
          totalPoint: totalPrice,
          status: 'SUCCESS',
          createdAt: dayjs().unix(),
          updatedAt: dayjs().unix(),
        },
      });

      const newBalance = (user?.balance || 0) - totalPrice;

      await this.userRepository.update({
        where: { id: userId },
        data: { updatedAt: dayjs().unix(), balance: newBalance },
      });

      return orders;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  listOrders = async (userId?: string) => {
    try {
      const orders = await this.ordersRepository.findMany({
        where: { userId },
      });

      return orders;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  cancelOrder = async (userId: string, orderId: string) => {
    try {
      const [orders, user] = await Promise.all([
        this.ordersRepository.findFirst({
          where: { userId, id: orderId },
        }),
        this.userRepository.findFirst({
          where: { id: userId },
        }),
      ]);

      if (!orders) {
        throw new Error('order does not exist');
      }

      if (orders.status !== 'SUCCESS') {
        throw new Error('Error: can only cancel successful orders');
      }

      await this.ordersRepository.update({
        where: { userId, id: orderId },
        data: { updatedAt: dayjs().unix(), status: 'CANCELLED' },
      });

      const newBalance = (user?.balance || 0) + orders.totalPoint;
      await this.userRepository.update({
        where: { id: userId },
        data: { updatedAt: dayjs().unix(), balance: newBalance },
      });

      return orders;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };
}
