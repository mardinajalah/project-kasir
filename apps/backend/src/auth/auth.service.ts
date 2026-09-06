import bcrypt from 'bcrypt';
import { InsertUser, SelectUser } from '../db/schema';
import { LoginType, RegisterType } from '../db/validator';
import { envConfig } from '../config/env';
import jwt from 'jsonwebtoken';

export interface AuthRepositoryType {
  getUserByEmail(email: string): Promise<SelectUser | undefined>;
  createUser(newUser: InsertUser): Promise<unknown>;
}

export class AuthService {
  private authRepository: AuthRepositoryType;

  constructor(authRepository: AuthRepositoryType) {
    this.authRepository = authRepository;
  }

  async register(data: RegisterType) {
    const existingUser = await this.authRepository.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser: InsertUser = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'user',
      kodeUser: null,
    };

    return await this.authRepository.createUser(newUser);
  }

  async login(data: LoginType) {
    const user = await this.authRepository.getUserByEmail(data.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Exclude password from the return object
    const { password: _password, ...userWithoutPassword } = user;

    // create access
    const accessToken = jwt.sign(userWithoutPassword, envConfig.accessKey as string, { expiresIn: '30s' });
    const refreshToken = jwt.sign(userWithoutPassword, envConfig.refreshKey as string, { expiresIn: '1d' });

    const oneDay = 24 * 60 * 60 * 1000;

    return {
      userWithoutPassword,
      accessToken,
      refreshToken,
      oneDay
    };
  }
}
