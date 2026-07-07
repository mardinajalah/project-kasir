import { ProductType } from '@kasir/types';
import { createProduct, getAllProducts, getProductById } from './product.repository';
import { getUnitById } from '../unit/unit.repository';
import { getCategoryById } from "../category/category.repository"

export const getAllDataProducts = async () => {
  const products = await getAllProducts();
  return products;
};

export const getDataProductById = async (productId: number) => {
  const product = await getProductById(productId);
  return product;
};

export const createDataProduct = async (newProduct: ProductType) => {
  const unitId = await getUnitById(newProduct.unitId);
  const categoryId = await getCategoryById(newProduct.categoryId)


  if (!newProduct || typeof newProduct !== 'object') {
    throw new Error('Invalid product data');
  }

  if (!unitId.id) {
    throw new Error('Unit id not found');
  }

  if(!categoryId.id) {
    throw new Error('Unit id not found');
  }

  const createdProduct = await createProduct(newProduct);
  return createdProduct;
};
