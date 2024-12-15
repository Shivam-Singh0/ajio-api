import express from 'express';
import authenticateUser from '../middleware/authMiddleware.js';
import { addToCart, CheckoutSession, createOrder, getCart, getOrder, removeFromCart, updateQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.route('').get(authenticateUser, getCart)

router.route('/addToCart').post(authenticateUser, addToCart)
router.route('/update-quantity').post(authenticateUser, updateQuantity)
router.route('/remove').delete(authenticateUser, removeFromCart)
router.route('/checkout').post(CheckoutSession);
router.route('/order').get(authenticateUser, getOrder).post(authenticateUser, createOrder);



export default router;