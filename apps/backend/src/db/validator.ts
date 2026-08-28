import { createInsertSchema } from 'drizzle-orm/zod';
import { productTable } from './schema';
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

export type ProductType = z.infer<typeof insertProductSchema>;
