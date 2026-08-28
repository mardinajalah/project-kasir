import { Router } from 'express';

import { ProductController } from '../product/product.controller';
import { ProductService } from '../product/product.service';
import { ProductRepository } from '../product/product.repository';
import { UnitService } from '../unit/unit.service';
import { UnitsRepository } from '../unit/unit.repository';
import { CategoryRepository } from '../category/category.repository';
import { CategoryService } from '../category/category.service';
import { VendorRepository } from '../vendor/vendor.repository';
import { VendorService } from '../vendor/vendor.service';

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
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.post('/', (req, res) => productController.createProduct(req, res));
router.put('/:id', (req, res) => productController.updateProduct(req, res));

export default router;
