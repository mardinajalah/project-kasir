import { ProductType, UnitType, CategoryType, VendorType } from '@kasir/types';

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

type VendorRepositoryType = {
  getVendorById(id: number): Promise<VendorType | undefined>;
};

export class ProductService {
  private productRepository;
  private unitRepository;
  private categoryRepository;
  private vendorRepository

  constructor(productRepository: ProductRepositoryType, unitRepository: UnitRepositoryType, categoryRepository: CategoryRepositoryType, vendorRepository: VendorRepositoryType) {
    this.productRepository = productRepository;
    this.unitRepository = unitRepository;
    this.categoryRepository = categoryRepository;
    this.vendorRepository = vendorRepository
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
    const vendor = await this.vendorRepository.getVendorById(newProduct.vendorId)
    const products = await this.getAllProducts();

    products.map((product) => {
      if (product.kodeProduct === newProduct.kodeProduct) {
        throw new Error('The product code already exists.');
      }
    });

    if (Object.keys(newProduct).length < 8) {
      throw new Error('Insufficient data');
    }

    if (!newProduct || typeof newProduct !== 'object') {
      throw new Error('Invalid product');
    }

    if (!unit || !category || !vendor) {
      throw new Error('Unit or category or vendor id not found');
    }

    const dataProduct = await this.productRepository.createProduct(newProduct);
    return dataProduct;
  }
}
