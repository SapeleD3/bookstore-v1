import { Algorithm } from 'jsonwebtoken';

export type CreateUserPayload = {
  email: string;
  password: string;
  username: string;
};

export type UserLoginPayload = {
  password: string;
  email: string;
};

export type passwordHelperPayload = {
  password: string;
  hash?: string;
};

export type UserLoginResponse = {
  user: any;
  token: string;
};

export type GenerateJwtTokenPayload = {
  customerId: string;
  secret: string;
  algorithm: Algorithm;
};

export type DecryptJwtTokenPayload = {
  token: string;
  secret: string;
};

export type DecryptJwtTokenResponse = {
  customerId: string;
  exp: number;
  iat: number;
};

export type UsersEnv = {
  _SECRET: string;
  _ALGO: Algorithm;
};
