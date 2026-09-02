import { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../db/validator';
import { AuthService } from './auth.service';
import { envConfig } from '../config/env';
import jwt from 'jsonwebtoken';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response) {
    const validatedData = registerSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validatedData.error.flatten(),
      });
    }

    try {
      await this.authService.register(validatedData.data);
      return res.status(201).json({
        message: 'Registration successful',
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  }

  async login(req: Request, res: Response) {
    const validatedData = loginSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validatedData.error.flatten(),
      });
    }

    try {
      const user = await this.authService.login(validatedData.data);

      const accessToken = jwt.sign(user, envConfig.accessKey as string, { expiresIn: '30s' });
      const refreshToken = jwt.sign(user, envConfig.refreshKey as string, { expiresIn: '1d' });

      const oneDay = 24 * 60 * 60 * 1000;

      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: oneDay, secure: true });

      return res.status(200).json({
        message: 'Login successful',
        data: user,
        token: accessToken,
      });
    } catch (error) {
      return res.status(401).json({
        message: error instanceof Error ? error.message : 'Login failed',
      });
    }
  }
}
