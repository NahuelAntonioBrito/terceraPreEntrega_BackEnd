import { Router } from 'express';
import { createCartController, getCartByIdController, addProductToCartController, deleteProductToCart, addProductsToCartController, updateProductToCartController, deleteProductsFromCartController, purchaseController} from '../controllers/carts.controller.js';
import { handlePolicies, publicRoutes } from '../middlewares/auth.middleware.js';
import passport from 'passport';

const router = Router();

router.post('/', handlePolicies(['USER', 'ADMIN']), createCartController);

router.get('/:cid', handlePolicies(['USER', 'ADMIN']), getCartByIdController);

router.post('/:cid/product/:pid', addProductToCartController);

router.delete('/:cid/product/:pid', handlePolicies(['USER', 'ADMIN']), deleteProductToCart);

router.put('/:cid', handlePolicies(['USER']), addProductsToCartController);

router.put('/:cid/product/:pid', handlePolicies(['USER', 'ADMIN']), updateProductToCartController);

router.delete('/:cid', handlePolicies(['USER', 'ADMIN']), deleteProductsFromCartController);


router.get('/:cid/purchase', passport.authenticate('jwt', { session: false }), purchaseController);




export default router