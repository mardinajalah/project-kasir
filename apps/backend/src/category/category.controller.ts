import { CategoryType } from '@kasir/types';
import type { Request, Response } from 'express';

interface CategoryServiceType {
  getAllCategories(): Promise<CategoryType[]>;
  getCategoryById(id: number): Promise<CategoryType>;
  createCtegory(newData: CategoryType): Promise<CategoryType>;
}

export class CategoryController {
  private categoryService;

  constructor(categoryService: CategoryServiceType) {
    this.categoryService = categoryService;
  }

  async getAllCategories(_req: Request, res: Response) {
    try {
      const dataCategories = await this.categoryService.getAllCategories()
      res.status(200).json({
        message: 'Categories fetched successfully',
        data: dataCategories
      })
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch categories' });
    }
  }
}
