import express from "express";
import { getAllShops, getShopDetails } from "../controllers/shopController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getAllShops);
router.get("/:id", checkAuth, getShopDetails);

export default router;
