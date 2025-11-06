import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { addCartItems } from "../controller/cartController.js";

const router = express.Router();

// ✅ Add item to cart
router.post("/add", verifyToken, addCartItems);



export default router;
