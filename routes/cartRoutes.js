import express from 'express';
import authenticateUser from '../middleware/authMiddleware.js';
import { addToCart, getCart, removeFromCart, updateQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.route('').get(authenticateUser, getCart)

router.route('/addToCart').post(authenticateUser, addToCart)
router.route('/update-quantity').post(authenticateUser, updateQuantity)
router.route('/remove').delete(authenticateUser, removeFromCart)



export default router;