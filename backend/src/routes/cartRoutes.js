import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from "../controllers/cartController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/add", checkAuth, addToCart);
router.get("/", checkAuth, getCart);
router.put("/update/:productId", checkAuth, updateCart);
router.delete("/remove/:productId", checkAuth, removeFromCart);

export default router;
