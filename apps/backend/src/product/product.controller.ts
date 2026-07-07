import type { Request, Response } from 'express';
import { getAllDataProducts } from './product.service';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllDataProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
