import { getAllProducts } from './product.repository';

export const getAllDataProducts = async () => {
  const products = await getAllProducts();
  return products;
};
