import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { UsersController, UsersService } from './domains/users';
import { BooksController, BooksService } from './domains/books';
import { OrdersController, OrdersService } from './domains/orders';
import { config } from 'dotenv';

config();
const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  env: asValue(process.env),

  usersController: asClass(UsersController),
  usersService: asClass(UsersService),

  booksController: asClass(BooksController),
  booksService: asClass(BooksService),

  ordersController: asClass(OrdersController),
  ordersService: asClass(OrdersService),
});

export default container;
