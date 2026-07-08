import type { Request, Response } from 'express';
import { ProductService } from './product.service';
import { ProductType } from '@kasir/types';

export class ProductController {
  private productService = new ProductService();

  getProducts = async (_req: Request, res: Response) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json({
        message: 'Products fetched successfully',
        data: products,
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch products' });
    }
  }

  getProductById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid product id' });
    }

    try {
      const product = await this.productService.getProductById(id);

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
  }

  createProduct = async (req: Request, res: Response) => {
    const newProduct: ProductType = req.body;

    try {
      await this.productService.createProduct(newProduct);
      res.status(201).json({
        message: 'Product created successfully',
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create product' });
    }
  };
}
