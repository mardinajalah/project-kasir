import { CategoryType } from '@kasir/types';

type CategoryRepository = {
  getAllcategories(): Promise<CategoryType[]>;
  getCategoryById(id: number): Promise<CategoryType | undefined>;
  createCategory(newData: CategoryType): Promise<unknown>;
};

export class CategoryService {
  private categoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getAllCategories() {
    const categories = await this.categoryRepository.getAllcategories();
    return categories
  }

  async getCategoryById(categoryId: number) {
    const category = await this.categoryRepository.getCategoryById(categoryId)
    return category
  }

  async createCtegory(newCategory: CategoryType) {
    const dataCtegory = await this.categoryRepository.createCategory(newCategory)
    return dataCtegory
  }
}
