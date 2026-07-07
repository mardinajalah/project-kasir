import type { Request, Response } from 'express';
import { createDataProduct, getAllDataProducts, getDataProductById } from './product.service';
import { ProductType } from '@kasir/types';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllDataProducts();
    res.status(200).json({
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid product id' });
  }

  try {
    const product = await getDataProductById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const newProduct: ProductType = req.body;

  try {
    const createdProduct = await createDataProduct(newProduct);
    res.status(201).json({
      message: 'Product created successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create product' });
  }
}
