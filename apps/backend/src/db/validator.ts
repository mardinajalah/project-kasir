import { createInsertSchema } from 'drizzle-orm/zod';
import { productTable, userTable } from './schema';
import z from 'zod';

export const insertProductSchema = createInsertSchema(productTable).extend({
  kodeProduct: z.string().min(1, 'Product code is required'),
  name: z.string().min(1, 'Product name is required'),
  buyPrice: z.number().int().nonnegative(),
  sellPrice: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
  minStock: z.number().int().nonnegative(),
  categoryId: z.number().int().nonnegative(),
  unitId: z.number().int().nonnegative(),
  vendorId: z.number().int().nonnegative(),
});

export const updateProductSchema = z.object({
  kodeProduct: z.string().min(1, 'Product code is required').optional(),
  name: z.string().min(1, 'Product name is required').optional(),
  buyPrice: z.number().int().nonnegative().optional(),
  sellPrice: z.number().int().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
  minStock: z.number().int().nonnegative().optional(),
  categoryId: z.number().int().nonnegative().optional(),
  unitId: z.number().int().nonnegative().optional(),
  vendorId: z.number().int().nonnegative().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  kodeUser: z.string().nullable().optional(),
  role: z.enum(['admin', 'user']).default('user'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  kodeUser: z.string().nullable().optional(),
  role: z.enum(['admin', 'user']).optional(),
});

export const insertUserSchema = registerSchema;

export type UpdateProductType = z.infer<typeof updateUserSchema>

export type RegisterType = z.infer<typeof registerSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
export type UserType = RegisterType;
export type ProductType = z.infer<typeof insertProductSchema>;
