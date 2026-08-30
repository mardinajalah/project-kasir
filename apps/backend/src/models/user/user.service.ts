import { InsertUser, SelectUser } from '../../db/schema';
import { CreateUserType, UpdateUserType } from '../../db/validator';
import bcrypt from 'bcrypt';

export interface UserReposiToryType {
  getAllUser(): Promise<SelectUser[]>;
  getUserById(id: number): Promise<SelectUser | undefined>;
  getUserByEmail(email: string): Promise<SelectUser | undefined>;
  createUser(newData: InsertUser): Promise<unknown>;
  updateUser(newData: Partial<InsertUser>, id: number): Promise<unknown>;
  deleteUser(id: number): Promise<unknown>;
}

export class UserService {
  private userRepository: UserReposiToryType;

  constructor(userRepository: UserReposiToryType) {
    this.userRepository = userRepository;
  }

  async getAllUser() {
    const users = await this.userRepository.getAllUser();
    return users.map(({ password: _password, ...user }) => user);
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) return undefined;
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async createUser(newUser: CreateUserType) {
    const existingUser = await this.userRepository.getUserByEmail(newUser.email);
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    const dataUser: InsertUser = {
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      role: newUser.role ?? 'user',
      kodeUser: newUser.kodeUser ?? null,
    };

    return await this.userRepository.createUser(dataUser);
  }

  async updateUser(data: UpdateUserType, userId: number) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (data.email && data.email !== user.email) {
      const existingEmail = await this.userRepository.getUserByEmail(data.email);
      if (existingEmail) {
        throw new Error('Email is already used by another account');
      }
    }

    const updateData: Partial<InsertUser> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.kodeUser !== undefined) updateData.kodeUser = data.kodeUser;
    if (data.role !== undefined) updateData.role = data.role;

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(data.password, salt);
    }

    return await this.userRepository.updateUser(updateData, userId);
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userRepository.deleteUser(userId);
  }
}

