import express from 'express';
import container from '../../container.awilix';
import auth from '../../middleware/auth';
import { IBookController } from '../../domains/books/interface';

const userRouter = express.Router();

const booksController: IBookController = container.resolve('booksController');

userRouter.get('/', auth, booksController.listBooks);

export default userRouter;
