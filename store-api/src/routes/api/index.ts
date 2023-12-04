import express from 'express';
import userRouter from './user';
import bookRouter from './book';
import orderRouter from './order';

const router = express.Router();

router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/orders', orderRouter);

export default router;
