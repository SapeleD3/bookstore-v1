import dayjs from 'dayjs';
import { xPrisma, exclude } from '../../commons/database';
import {
  CreateUserPayload,
  UserLoginPayload,
  UserLoginResponse,
  UsersEnv,
} from './types';
import {
  encryptPassword,
  comparePassword,
  generateJwtToken,
} from './utils/modifiers';
import { User } from '@prisma/client';

export default class UsersService {
  env: UsersEnv;
  private userRepository = xPrisma.user;

  constructor({ env }: { env: UsersEnv }) {
    this.env = env;
  }

  createUser = async (
    props: CreateUserPayload
  ): Promise<UserLoginResponse | void> => {
    const { email, username, password } = props;
    try {
      const user = await this.userRepository.findUnique({ where: { email } });

      // NOTE: user would have already checked if username already exists with provided endpoint
      if (user) {
        throw new Error('User already exists');
      }

      const hash = encryptPassword(password);
      const newUser = await this.userRepository.create({
        data: {
          email,
          password: hash,
          balance: 100, // default registered users to 100 point
          createdAt: dayjs().unix(),
          updatedAt: dayjs().unix(),
        },
      });
      const userWithoutPassword = exclude(newUser, ['password']);

      const token = generateJwtToken({
        customerId: newUser?.id,
        secret: this.env._SECRET,
        algorithm: this.env._ALGO,
      });

      return {
        token,
        user: userWithoutPassword,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  userLogin = async (
    props: UserLoginPayload
  ): Promise<UserLoginResponse | void> => {
    const { email, password } = props;
    try {
      const user = await this.userRepository.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('Invalid login details');
      }

      const isMatchingPassword = comparePassword({
        password,
        hash: user.password,
      });

      if (!isMatchingPassword) {
        throw new Error('Invalid login details');
      }

      const token = generateJwtToken({
        customerId: user.id,
        secret: this.env._SECRET,
        algorithm: this.env._ALGO,
      });

      const userWithoutPassword = exclude(user, ['password']);

      return {
        token,
        user: userWithoutPassword,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  getAuthUserDetails = async (id?: string): Promise<Partial<User>> => {
    try {
      const user = await this.userRepository.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error('Invalid login details');
      }

      const userWithoutPassword = exclude(user, ['password']);

      return userWithoutPassword;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };
}
