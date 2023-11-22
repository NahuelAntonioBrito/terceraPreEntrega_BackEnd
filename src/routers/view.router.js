import { Router } from 'express';
import passport from "passport";
import { viewProductsController, realTimeProductsController, viewCartController } from '../controllers/view.router.controller.js';
import { publicRoutes, handlePolicies } from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/' , publicRoutes, handlePolicies(['USER', 'ADMIN']),passport.authenticate('current', { session: false }), viewProductsController)

router.get('/realTimeProducts', handlePolicies(['USER', 'ADMIN']), realTimeProductsController)

router.get('/:cid', handlePolicies(['USER', 'ADMIN']), viewCartController)


export default router