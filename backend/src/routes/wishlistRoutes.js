import express from "express";
import {
  getWishList,
  addToWishList,
  removeFromWishList,
} from "../controllers/wishlistController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getWishList);
router.post("/", checkAuth, addToWishList);
router.delete("/:productId", checkAuth, removeFromWishList);

export default router;
