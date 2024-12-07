import express from "express";
import { addToWishlist, getWishlist, isWishlisted, removeWishlist } from "../controllers/wishListController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("").get(authenticateUser,getWishlist).post(authenticateUser, addToWishlist).delete(authenticateUser, removeWishlist);
router.route("/is-wishlisted").post(authenticateUser, isWishlisted)

export default router;