import { Router } from 'express';

import { ProductController } from '../product/product.controller';
import { ProductService } from '../product/product.service';
import { ProductRepository } from '../product/product.repository';
import { UnitsRepository } from '../unit/unit.repository';
import { CategoryRepository } from '../category/category.repository';

const router = Router();

const productRepository = new ProductRepository();
const unitRepository = new UnitsRepository();
const categoryRepository = new CategoryRepository();
const productService = new ProductService(productRepository, unitRepository, categoryRepository);
const productController = new ProductController(productService);

router.get('/', (req, res) => productController.getProducts(req, res));
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.post('/', (req, res) => productController.createProduct(req, res));

export default router;
