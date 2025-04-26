import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  getCategories,
  addCategory,
  removeCategory,
} from "../controllers/categorieController.js";

const router = express.Router();

router.get("/", checkAuth, getCategories);
router.post("/add", checkAuth, addCategory);
router.delete("/remove", checkAuth, removeCategory);

export default router;
