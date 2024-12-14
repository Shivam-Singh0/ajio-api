import express from 'express';
import authenticateUser from '../middleware/authMiddleware.js';
import { addToCart, CheckoutSession, getCart, removeFromCart, updateQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.route('').get(authenticateUser, getCart)

router.route('/addToCart').post(authenticateUser, addToCart)
router.route('/update-quantity').post(authenticateUser, updateQuantity)
router.route('/remove').delete(authenticateUser, removeFromCart)
router.route('/checkout').post(CheckoutSession);



export default router;