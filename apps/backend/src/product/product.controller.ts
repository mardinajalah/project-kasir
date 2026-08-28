import type { Request, Response } from 'express';
import { CategoryType, ProductType, UnitType, VendorType } from '@kasir/types';
import { formatIdr } from '@kasir/utils';

interface ProductServiceType {
  getAllProducts(): Promise<ProductType[]>;
  getProductById(id: number): Promise<ProductType | undefined>;
  existingProduct(kode: string): Promise<ProductType | undefined>;
  createProduct(newData: ProductType): Promise<unknown>;
  updateProduct(newData: ProductType, id: number): Promise<unknown>;
}

interface UnitServiceType {
  getUnitsById(id: number): Promise<UnitType | undefined>;
}

interface CategoryServiceType {
  getCategoryById(id: number): Promise<CategoryType | undefined>;
}

interface VendorServiceType {
  getVendorById(id: number): Promise<VendorType | undefined>;
}

export class ProductController {
  private productService;
  private unitService;
  private categoryService;
  private vendorService;

  constructor(productService: ProductServiceType, unitService: UnitServiceType, categoryService: CategoryServiceType, vendorService: VendorServiceType) {
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
    const newProduct: ProductType = req.body;

    try {
      const dataUnitById = await this.unitService.getUnitsById(newProduct.unitId);
      const dataCategoryById = await this.categoryService.getCategoryById(newProduct.categoryId);
      const dataVendorById = await this.vendorService.getVendorById(newProduct.vendorId);
      const dataProductByCode = await this.productService.existingProduct(newProduct.kodeProduct);

      if (dataProductByCode) {
        return res.status(409).json({
          message: 'The product code already exists.',
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

      await this.productService.createProduct(newProduct);
      res.status(201).json({
        message: 'Product created successfully',
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create product' });
    }
  }

  async updateProduct(req: Request, res: Response) {
    const productId = Number(req.params.id);
    const newProduct = req.body;
    try {
      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ error: 'Invalid product id' });
      }

      const productById = await this.productService.getProductById(productId);

      if (!productById) {
        return res.status(404).json({
          message: 'productId Not Found',
        });
      }

      await this.productService.updateProduct(newProduct, productId);

      res.status(200).json({
        message: 'product succsesfuly update',
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update product' });
    }
  }
}
