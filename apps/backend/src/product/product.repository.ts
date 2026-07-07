import { eq } from 'drizzle-orm';
import { db } from '../db';
import { productTable } from '../db/schema';
import { ProductType } from '@kasir/types';

export const getAllProducts = async () => {
  const products = await db.select().from(productTable);
  return products;
};

export const getProductById = async (productId: number) => {
  const [product] = await db
    .select()
    .from(productTable)
    .where(eq(productTable.id, productId))
    .limit(1);

  return product;
};

export const createProduct = async (newProduct: ProductType) => {
  const newProductData = await db.insert(productTable).values(newProduct);
  return newProductData;
}