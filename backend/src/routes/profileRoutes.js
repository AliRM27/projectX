import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  getUser,
  updateUser,
  deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", checkAuth, getUser);
router.put("/", checkAuth, updateUser);
router.delete("/", checkAuth, deleteProfile);

export default router;
