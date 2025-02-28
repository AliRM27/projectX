import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { getProfile, getWishList } from "../controllers/profileController.js";

const router = express.Router();

router.get("/", checkAuth, getProfile);
router.get("/wishlist", checkAuth, getWishList);

export default router;
