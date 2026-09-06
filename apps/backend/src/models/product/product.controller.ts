import type { Request, Response } from 'express';
import { formatIdr } from '@kasir/utils';
import { createProductSchema, updateProductSchema } from '../../db/validator';
import type { ProductService } from './product.service';
import type { UnitService } from '../unit/unit.service';
import type { CategoryService } from '../category/category.service';
import type { VendorService } from '../vendor/vendor.service';

export class ProductController {
  private productService: ProductService;
  private unitService: UnitService;
  private categoryService: CategoryService;
  private vendorService: VendorService;

  constructor(productService: ProductService, unitService: UnitService, categoryService: CategoryService, vendorService: VendorService) {
    this.productService = productService;
    this.unitService = unitService;
    this.categoryService = categoryService;
    this.vendorService = vendorService;
  }

  async getProducts(_req: Request, res: Response) {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json({
        message: 'Products fetched successfully',
        data: products.map((product) => ({
          ...product,
          buyPrice: formatIdr(product.buyPrice),
          sellPrice: formatIdr(product.sellPrice),
        })),
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch products' });
    }
  }

  async getProductById(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid product id' });
      }

      const product = await this.productService.getProductById(id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({
        message: 'Product fetched successfully',
        data: {
          ...product,
          buyPrice: formatIdr(product.buyPrice),
          sellPrice: formatIdr(product.sellPrice),
        },
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch product' });
    }
  }

  async createProduct(req: Request, res: Response) {
    const newProduct = createProductSchema.safeParse(req.body);
    try {
      if (!newProduct.success) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: newProduct.error.flatten(),
        });
      }

      const dataUnitById = await this.unitService.getUnitsById(newProduct.data.unitId);
      const dataCategoryById = await this.categoryService.getCategoryById(newProduct.data.categoryId);
      const dataVendorById = await this.vendorService.getVendorById(newProduct.data.vendorId);
      const allProduct = await this.productService.getAllProducts();

      const avaliabelKodeProduct = allProduct.find((avaliabel) => avaliabel.kodeProduct === newProduct.data.kodeProduct);

      if (avaliabelKodeProduct) {
        return res.status(409).json({
          message: 'kode product already exists',
        });
      }

      if (!dataUnitById) {
        return res.status(404).json({
          message: 'The unitId not found',
        });
      }

      if (!dataCategoryById) {
        return res.status(404).json({
          message: 'The categoryId not found',
        });
      }

      if (!dataVendorById) {
        return res.status(404).json({
          message: 'The vendorId not found',
        });
      }

      await this.productService.createProduct(newProduct.data);
      res.status(201).json({
        message: 'Product created successfully',
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create product' });
    }
  }

  async updateProduct(req: Request, res: Response) {
    const productId = Number(req.params.id);
    const newProduct = updateProductSchema.safeParse(req.body);
    try {
      if (!newProduct.success) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: newProduct.error.flatten(),
        });
      }

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ error: 'Invalid product id' });
      }

      const productById = await this.productService.getProductById(productId);
      const allProduct = await this.productService.getAllProducts();

      const avaliabelKodeProduct = allProduct.find((avaliabel) => avaliabel.kodeProduct === newProduct.data.kodeProduct);

      if (avaliabelKodeProduct) {
        return res.status(409).json({
          message: 'kode product already exists',
        });
      }

      if (!productById) {
        return res.status(404).json({
          message: 'productId Not Found',
        });
      }

      await this.productService.updateProduct(newProduct.data, productId);
      res.status(202).json({
        message: 'product updated succsesfuly',
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update product' });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const productId = Number(req.params.id);
    try {
      const productById = await this.productService.getProductById(productId);

      if (!productById) {
        return res.status(404).json({
          message: 'productId Not Found',
        });
      }

      await this.productService.deleteProduct(productId);
      res.status(202).json({
        message: 'product deleted succsesfuly',
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to delete product' });
    }
  }
}
