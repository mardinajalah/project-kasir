import { Request, Response } from 'express';
import { createUserSchema, CreateUserType, updateUserSchema, UpdateUserType } from '../../db/validator';
import { SelectUser } from '../../db/schema';

type UserResponse = Omit<SelectUser, 'password'>;

interface UserServiceType {
  getAllUser(): Promise<UserResponse[]>;
  getUserById(id: number): Promise<UserResponse | undefined>;
  createUser(newData: CreateUserType): Promise<unknown>;
  updateUser(newData: UpdateUserType, id: number): Promise<unknown>;
  deleteUser(id: number): Promise<unknown>;
}

export class UserController {
  private userService: UserServiceType;

  constructor(userService: UserServiceType) {
    this.userService = userService;
  }

  async getAllUser(_req: Request, res: Response) {
    try {
      const dataUsers = await this.userService.getAllUser();
      return res.status(200).json({
        message: 'Fetch users successfully',
        data: dataUsers,
      });
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch users',
      });
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
      const dataUser = await this.userService.getUserById(userId);

      if (!dataUser) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      return res.status(200).json({
        message: 'Fetch user successfully',
        data: dataUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch user',
      });
    }
  }

  async createUser(req: Request, res: Response) {
    const validatedData = createUserSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validatedData.error.flatten(),
      });
    }

    try {
      await this.userService.createUser(validatedData.data);
      return res.status(201).json({
        message: 'User created successfully',
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to create user',
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const validatedData = updateUserSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validatedData.error.flatten(),
      });
    }

    try {
      await this.userService.updateUser(validatedData.data, userId);
      return res.status(200).json({
        message: 'User updated successfully',
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to update user',
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
      await this.userService.deleteUser(userId);
      return res.status(200).json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to delete user',
      });
    }
  }
}

