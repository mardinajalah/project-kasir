import { Router } from 'express';
import { ProductController } from '../product/product.controller';

const router = Router();
const productController = new ProductController()

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);

export default router;
