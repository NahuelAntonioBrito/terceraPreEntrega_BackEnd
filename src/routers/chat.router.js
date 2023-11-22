import { Router } from 'express';
import { getMessagesController } from '../controllers/chat.controller.js';
import { handlePolicies } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', handlePolicies(['USER']), getMessagesController)

export default router