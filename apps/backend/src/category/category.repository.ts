import { eq } from 'drizzle-orm';
import { db } from '../db';
import { categoryTable } from '../db/schema';
import { CategoryType } from '@kasir/types';

export class CategoryRepository {
  async getAllcategories() {
    const categorys = await db.select().from(categoryTable);
    return categorys;
  }

  async getCategoryById(categoryId: number) {
    const [category] = await db.select().from(categoryTable).where(eq(categoryTable.id, categoryId)).limit(1);
    return category;
  }

  async createCategory(newCategory: CategoryType) {

    // if(!newCategory)


    const newCategoryData = await db.insert(categoryTable).values(newCategory);
    return newCategoryData;
  }
}
