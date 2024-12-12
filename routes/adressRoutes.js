import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { addAdress } from "../controllers/AddressController.js";

const router = express.Router();
router.route("").post(authenticateUser, addAdress);
export default router;