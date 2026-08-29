import { Router } from 'express';

import { ProductController } from '../models/product/product.controller';
import { ProductService } from '../models/product/product.service';
import { ProductRepository } from '../models/product/product.repository';
import { UnitService } from '../models/unit/unit.service';
import { UnitsRepository } from '../models/unit/unit.repository';
import { CategoryRepository } from '../models/category/category.repository';
import { CategoryService } from '../models/category/category.service';
import { VendorRepository } from '../models/vendor/vendor.repository';
import { VendorService } from '../models/vendor/vendor.service';

const router = Router();

const productRepository = new ProductRepository();
const unitRepository = new UnitsRepository();
const categoryRepository = new CategoryRepository();
const vendorRepository = new VendorRepository();

const productService = new ProductService(productRepository);
const unitService = new UnitService(unitRepository);
const categoryService = new CategoryService(categoryRepository);
const vendorService = new VendorService(vendorRepository);

const productController = new ProductController(productService, unitService, categoryService, vendorService);

router.get('/', (req, res) => productController.getProducts(req, res));
router.post('/', (req, res) => productController.createProduct(req, res));
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.put('/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/:id', (req, res) => productController.deleteProduct(req, res));

export default router;
