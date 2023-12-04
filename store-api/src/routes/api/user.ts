import { IUserController } from '../../domains/users/interface';
import express from 'express';
import container from '../../container.awilix';
import auth from '../../middleware/auth';
import validate from '../../middleware/inputValidator';
import UserValidation from '../validations/userValidations';

const userRouter = express.Router();

const usersController: IUserController = container.resolve('usersController');

userRouter.post(
  '/register',
  validate(UserValidation.register),
  usersController.registerUser
);
userRouter.post(
  '/login',
  validate(UserValidation.login),
  usersController.userLogin
);
userRouter.get('/', auth, usersController.getAuthUser);

export default userRouter;
