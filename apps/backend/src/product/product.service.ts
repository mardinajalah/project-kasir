import { ProductType, UnitType, CategoryType } from '@kasir/types';

type ProductRepositoryType = {
  getAllProducts(): Promise<ProductType[]>;
  getProductById(id: number): Promise<ProductType | undefined>;
  createProduct(newProduct: ProductType): Promise<unknown>;
};

type UnitRepositoryType = {
  getUnitsById(id: number): Promise<UnitType | undefined>;
};

type CategoryRepositoryType = {
  getCategoryById(id: number): Promise<CategoryType | undefined>;
};

export class ProductService {
  private productRepository;
  private unitRepository;
  private categoryRepository;

  constructor(productRepository: ProductRepositoryType, unitRepository: UnitRepositoryType, categoryRepository: CategoryRepositoryType) {
    this.productRepository = productRepository;
    this.unitRepository = unitRepository;
    this.categoryRepository = categoryRepository;
  }

  async getAllProducts() {
    const products = await this.productRepository.getAllProducts();
    return products;
  }

  async getProductById(productId: number) {
    const product = await this.productRepository.getProductById(productId);
    return product;
  }

  async createProduct(newProduct: ProductType) {
    const unit = await this.unitRepository.getUnitsById(newProduct.unitId);
    const category = await this.categoryRepository.getCategoryById(newProduct.categoryId);
    const products = await this.getAllProducts();

    products.map((product) => {
      if (product.kode === newProduct.kode) {
        throw new Error('The product code already exists.');
      }
    });

    if (Object.keys(newProduct).length < 8) {
      throw new Error('Insufficient data');
    }

    if (!newProduct || typeof newProduct !== 'object') {
      throw new Error('Invalid product');
    }

    if (!unit || !category) {
      throw new Error('Unit or category id not found');
    }

    const dataProduct = await this.productRepository.createProduct(newProduct);
    return dataProduct;
  }
}
