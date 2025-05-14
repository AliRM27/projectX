import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  getUser,
  updateUser,
  deleteProfile,
} from "../controllers/profileController.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { editValidations } from "../validations/validations.js";

const router = express.Router();

router.get("/", checkAuth, getUser);
router.put("/", editValidations, handleValidationErrors, checkAuth, updateUser);
router.delete("/", checkAuth, deleteProfile);

export default router;
