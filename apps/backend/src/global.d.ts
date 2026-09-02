import { SelectUser } from '../db/schema';

type UserResponse = Omit<SelectUser, 'password'>;

declare global {
  namespace Express {
    interface Request {
      user: UserResponse;
    }
  }
}

export {};
