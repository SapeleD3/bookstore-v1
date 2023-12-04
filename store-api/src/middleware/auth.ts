import { decryptJwtToken } from '../domains/users/utils/modifiers';
import { Response, NextFunction } from 'express';
import statusCodes, { ReasonPhrases } from 'http-status-codes';
import { AuthRequest } from './interface';

const { UNAUTHORIZED } = statusCodes;

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authorization = (req.headers.authorization || '') as string;
  const token = authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(UNAUTHORIZED).send({
      data: null,
      status: false,
      message: ReasonPhrases.UNAUTHORIZED,
    });
  }

  try {
    const response = decryptJwtToken({
      token,
      secret: process.env._SECRET || '',
    });

    if (!response?.customerId) {
      return res.status(UNAUTHORIZED).send({
        data: null,
        status: false,
        message: ReasonPhrases.UNAUTHORIZED,
      });
    }

    req.id = response?.customerId;

    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).send({
      data: null,
      status: false,
      message: ReasonPhrases.UNAUTHORIZED,
    });
  }
};

export default auth;
