import express from 'express';
import { loginUser, logOut, registerUser } from '../controllers/userController.js';
const router = express.Router();
router.route('/signup').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logOut)

export default router