import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { addAdress, getAddress } from "../controllers/AddressController.js";

const router = express.Router();
router.route("").get(authenticateUser, getAddress).post(authenticateUser, addAdress);
export default router;