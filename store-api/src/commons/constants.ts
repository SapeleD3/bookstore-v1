import { Response } from 'express';
import RateLimiter from 'express-rate-limit';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * DDOS attack preventer. App should not allow a user
 * make more than 600 requests every 10 minutes i.e a request per second
 * @constant
 */
export const APP_USE_LIMIT = RateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 600, // limit each IP to 600 requests every 10 minutes, i.e a request per second,
  message:
    'Too many requests from this user, please try again after 10 minutes',
});

export const defaultCatchBlock = (res: Response, message = '') => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    data: null,
    message,
    status: ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};
