import express from "express";
import { addToWishlist, getWishlist, removeWishlist } from "../controllers/wishListController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("").get(authenticateUser,getWishlist).post(authenticateUser, addToWishlist).delete(authenticateUser, removeWishlist);

export default router;