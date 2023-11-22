import { Router } from 'express';
import { getProductController, getProductByIdController, addProductController, updateProductController, deleteProductController} from '../controllers/products.controller.js';
import { handlePolicies, publicRoutes } from '../middlewares/auth.middleware.js';
import passport from 'passport';

const router = Router();


router.get('/', publicRoutes,  handlePolicies(['USER', 'ADMIN']), passport.authenticate('current', { session: false }), getProductController);

router.get('/:pid', handlePolicies(['USER', 'ADMIN']), getProductByIdController);

router.post('/', handlePolicies(['ADMIN']), addProductController);

router.put('/:pid', handlePolicies(['ADMIN']), updateProductController);

router.delete('/:pid', handlePolicies(['ADMIN']), deleteProductController);

export default router