import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from "../controllers/cartController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getCart);
router.post("/add", checkAuth, addToCart);
router.put("/update/:productId", checkAuth, updateCart);
router.delete("/remove", checkAuth, removeFromCart);

export default router;
