import { env } from '../config/env.js';
import jwt from 'jsonwebtoken';

type JwtPayloadType = {
  userId: string;
  email: string;
  role: string;
};

export const generateAccessToken = (payload: JwtPayloadType) => {
  const options: jwt.SignOptions = {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as NonNullable<jwt.SignOptions['expiresIn']>,
  };

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
};

export const generateRefreshToken = (payload: JwtPayloadType) => {
  const options: jwt.SignOptions = {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as NonNullable<jwt.SignOptions['expiresIn']>,
  };

  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayloadType;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayloadType;
};
