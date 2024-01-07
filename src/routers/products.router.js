import { Router } from 'express';
import { getProductController, getProductByIdController, addProductController, updateProductController, deleteProductController} from '../controllers/products.controller.js';
import { handlePolicies, publicRoutes } from '../middlewares/auth.middleware.js';


const router = Router();


router.get('/', getProductController);


router.get('/:pid', handlePolicies(['USER', 'ADMIN']), getProductByIdController);

router.post('/', addProductController);

router.put('/:pid', handlePolicies(['ADMIN']), updateProductController);

router.delete('/:pid', handlePolicies(['ADMIN']), deleteProductController);

export default router