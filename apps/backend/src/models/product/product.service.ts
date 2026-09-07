import { CreateProductType, UpdateProductType } from '../../db/validator';
import type { ProductRepository } from './product.repository';

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
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
