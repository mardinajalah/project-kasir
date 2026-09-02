import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env';
import { SelectUser } from '../db/schema';

type UserResponse = Omit<SelectUser, 'password'>;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = auth.replace('Bearer ', '');

  try {
    const decode = jwt.verify(token, envConfig.accessKey as string) as UserResponse;

    req.user = decode;
    return next();
  } catch (error) {
    return res.status(401).json(error);
  }
};
