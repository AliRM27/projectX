import express from "express";
import { getProductsOrShops } from "../controllers/homeControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getProductsOrShops);

export default router;
