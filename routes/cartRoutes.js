import express from 'express';
import { Authenticated } from '../middleware/authMiddleware.js';
import { addToCart, getCart, updateQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.route('').get(Authenticated, getCart)

router.route('/addToCart').post(Authenticated, addToCart)
router.route('/update-quantity').post(Authenticated, updateQuantity)



export default router;