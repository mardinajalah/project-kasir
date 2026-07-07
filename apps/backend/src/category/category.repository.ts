import { eq } from 'drizzle-orm';
import { db } from '../db';
import { categoryTable } from '../db/schema';
import { CategoryType } from '@kasir/types';

export const getAllCategories = async () => {
  const categories = await db.select().from(categoryTable);
  return categories;
};

export const getCategoryById = async (categoryId: number) => {
  const [category] = await db
    .select()
    .from(categoryTable)
    .where(eq(categoryTable.id, categoryId))
    .limit(1);

  return category;
};

export const createcategory = async (newcategory: CategoryType) => {
  const newcategoryData = await db.insert(categoryTable).values(newcategory);
  return newcategoryData;
}