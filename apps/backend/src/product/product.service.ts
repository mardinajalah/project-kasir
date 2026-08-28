import { ProductType } from '@kasir/types';

interface ProductRepositoryType {
  getAllProducts(): Promise<ProductType[]>;
  getProductById(id: number): Promise<ProductType | undefined>;
  getProductByCode(kode: string): Promise<ProductType | undefined>;
  createProduct(newData: ProductType): Promise<unknown>;
  updateProduct(newData: ProductType, id: number): Promise<unknown>;
}

export class ProductService {
  private productRepository;

  constructor(productRepository: ProductRepositoryType) {
    this.productRepository = productRepository;
  }

  async getAllProducts() {
    const products = await this.productRepository.getAllProducts();
    return products;
  }

  async getProductById(productId: number) {
    const product = await this.productRepository.getProductById(productId);
    return product;
  }

  async existingProduct(kodeProduct: string) {
    const product = await this.productRepository.getProductByCode(kodeProduct);
    return product;
  }

  async createProduct(newProduct: ProductType) {
    const dataProduct = await this.productRepository.createProduct(newProduct);
    return dataProduct;
  }

  async updateProduct(newProduct: ProductType, productId: number) {
    const dataProduct = await this.productRepository.updateProduct(newProduct, productId);
    return dataProduct;
  }
}
