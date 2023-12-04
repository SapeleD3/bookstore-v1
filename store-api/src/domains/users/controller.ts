import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { defaultCatchBlock } from '../../commons/constants';
import { AuthRequest } from '../../middleware/interface';
import { IUserController } from './interface';
import UsersService from './service';

export default class UsersController implements IUserController {
  private usersService;

  constructor({ usersService }: { usersService: UsersService }) {
    this.usersService = usersService;
  }

  registerUser = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    try {
      const registeredUsername = await this.usersService.createUser({
        email,
        password,
        username,
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Created account successfully',
        data: registeredUsername,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  getAuthUser = async (req: AuthRequest, res: Response) => {
    try {
      const user = await this.usersService.getAuthUserDetails(req?.id);

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'User fetched successfully',
        data: user,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };

  userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await this.usersService.userLogin({ email, password });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'User login successfully',
        data: user,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };
}
