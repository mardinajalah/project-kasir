import { db } from '../db';
import { productTable } from '../db/schema';

export const getAllProducts = async () => {
  const products = await db.select().from(productTable);
  return products;
};
