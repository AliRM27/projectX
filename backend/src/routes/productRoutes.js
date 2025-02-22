import express from "express";
import {
  getAllProducts,
  getProductDetails,
} from "../controllers/productController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getAllProducts);
router.get("/:id", checkAuth, getProductDetails);

export default router;
