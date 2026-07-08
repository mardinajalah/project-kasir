import { ProductType } from '@kasir/types';
import { ProductRepository } from './product.repository';
import { UnitsRepository } from '../unit/unit.repository';
import { CategoryRepository } from '../category/category.repository';

export class ProductService {
  private productRepository = new ProductRepository();
  private categoryRepository = new CategoryRepository();
  private unitRepository = new UnitsRepository();

  getAllProducts = async () => {
    const products = await this.productRepository.getAllProducts();
    return products;
  }

  getProductById = async (productId: number) => {
    const product = await this.productRepository.getProductById(productId);
    return product;
  }

  createProduct = async (newProduct: ProductType) => {
    const unitId = await this.unitRepository.getUnitsById(newProduct.id);
    const categoryId = await this.categoryRepository.getCategoryById(newProduct.id);
    const products = await this.getAllProducts();

    products.map((product) => {
      if (product.kode === newProduct.kode) {
        throw new Error('The product code already exists.');
      }
    });

    if (!newProduct || typeof newProduct !== 'object') {
      throw new Error('Invalid product ');
    }

    if (!unitId || !categoryId) {
      throw new Error('Unit or category id not found');
    }

    const createdProduct = await this.productRepository.createProduct(newProduct);
    return createdProduct;
  }
}
