import { CreateProductType, UpdateProductType } from '../../db/validator';
import { InsertProduct, SelectProduct } from '../../db/schema';

interface ProductRepositoryType {
  getAllProducts(): Promise<SelectProduct[]>;
  getProductById(id: number): Promise<SelectProduct | undefined>;
  getProductByCode(kode: string): Promise<SelectProduct | undefined>;
  createProduct(newData: InsertProduct): Promise<unknown>;
  updateProduct(newData: Partial<InsertProduct>, id: number): Promise<unknown>;
  deleteProduct(id: number): Promise<unknown>;
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

  async createProduct(newProduct: CreateProductType) {
    const dataProduct = await this.productRepository.createProduct(newProduct);
    return dataProduct;
  }

  async updateProduct(newProduct: UpdateProductType, productId: number) {
    const dataProduct = await this.productRepository.updateProduct(newProduct, productId);
    return dataProduct;
  }

  async deleteProduct(productId: number) {
    return await this.productRepository.deleteProduct(productId);
  }
}
