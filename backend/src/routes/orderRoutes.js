import express from "express";
import {
  checkout,
  getOrders,
  getOrderById,
  cancelOrder,
} from "../controllers/orderController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/checkout", checkAuth, checkout);

router.get("/", checkAuth, getOrders);
router.get("/:orderId", checkAuth, getOrderById);
router.put("/cancel/:orderId", checkAuth, cancelOrder);

export default router;
