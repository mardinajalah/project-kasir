import { eq } from 'drizzle-orm';
import { db } from '../db';
import { categoryTable } from '../db/schema';
import { CategoryType } from '@kasir/types';

export class CategoryRepository {
  getAllcategorys = async () => {
    const categorys = await db.select().from(categoryTable);
    return categorys;
  }

  getCategoryById = async (categoryId: number) => {
    const [category] = await db.select().from(categoryTable).where(eq(categoryTable.id, categoryId)).limit(1);
    return category;
  }

  createCategory = async (newCategory: CategoryType) => {
    const newCategoryData = await db.insert(categoryTable).values(newCategory);
    return newCategoryData;
  }
}