import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { InsertProduct, productTable, SelectProduct } from '../../db/schema';

export class ProductRepository {
  async getAllProducts(): Promise<SelectProduct[]> {
    const products = await db.select().from(productTable);
    return products;
  }

  async getProductById(productId: number): Promise<SelectProduct> {
    const [product] = await db.select().from(productTable).where(eq(productTable.id, productId));
    return product;
  }

  async createProduct(newProduct: InsertProduct) {
    const newProductData = await db.insert(productTable).values(newProduct);
    return newProductData;
  }

  async updateProduct(newProduct: Partial<InsertProduct>, productId: number) {
    return await db.update(productTable).set(newProduct).where(eq(productTable.id, productId));
  }

  async deleteProduct(productId: number) {
    return await db.delete(productTable).where(eq(productTable.id, productId));
  }
}
