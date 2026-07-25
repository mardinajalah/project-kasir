import { eq } from 'drizzle-orm';
import { db } from '../db';
import { productTable } from '../db/schema';
import { ProductType } from '@kasir/types';

export class ProductRepository {
  async getAllProducts() {
    const products = await db.select().from(productTable);
    return products;
  }

  async getProductById(productId: number) {
    const [product] = await db.select().from(productTable).where(eq(productTable.id, productId)).limit(1);
    return product;
  }

  async createProduct(newProduct: ProductType) {
    const newProductData = await db.insert(productTable).values(newProduct);
    return newProductData;
  }
}
