import { Router } from 'express';
import { getProductPaginatedController, getProductController, getProductByIdController, addProductController, updateProductController, deleteProductController} from '../controllers/products.controller.js';
import { handlePolicies, publicRoutes } from '../middlewares/auth.middleware.js';


const router = Router();


router.get('/', handlePolicies(['USER', 'ADMIN']), getProductPaginatedController);

router.get('/noPaginate', handlePolicies(['USER', 'ADMIN']), getProductController);

router.get('/:pid', handlePolicies(['USER', 'ADMIN']), getProductByIdController);

router.post('/', addProductController);

router.put('/:pid', handlePolicies(['ADMIN']), updateProductController);

router.delete('/:pid', handlePolicies(['ADMIN']), deleteProductController);

export default router