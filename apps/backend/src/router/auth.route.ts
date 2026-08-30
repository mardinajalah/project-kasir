import { Router } from 'express';
import { UserRepository } from '../models/user/user.repository';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

export default router;
