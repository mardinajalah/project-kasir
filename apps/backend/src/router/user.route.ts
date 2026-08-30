import { Router } from 'express';
import { UserRepository } from '../models/user/user.repository';
import { UserService } from '../models/user/user.service';
import { UserController } from '../models/user/user.controller';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', (req, res) => userController.getAllUser(req, res));
router.get('/:id', (req, res) => userController.getUserById(req, res));
router.post('/', (req, res) => userController.createUser(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default router;
