import { Router } from 'express';
import { getProductPaginatedController, getProductController, getProductByIdController, addProductController, updateProductController, deleteProductController} from '../controllers/products.controller.js';
import { handlePolicies, publicRoutes } from '../middlewares/auth.middleware.js';
import passport from 'passport';
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();


router.get('/', passport.authenticate('current', { session: false }), handlePolicies(['USER', 'ADMIN']), getProductPaginatedController);

router.get('/noPaginate', passport.authenticate('current', { session: false }), handlePolicies(['USER', 'ADMIN']), getProductController);

router.get('/:pid', passport.authenticate('current', { session: false }), handlePolicies(['USER', 'ADMIN']), getProductByIdController);

router.post('/', passport.authenticate('current', { session: false }), handlePolicies(['USER', 'ADMIN']), addProductController);

router.put('/:pid', passport.authenticate('current', { session: false }), handlePolicies(['ADMIN']), updateProductController);

router.delete('/:pid', passport.authenticate('current', { session: false }), handlePolicies(['ADMIN']), deleteProductController);

export default router