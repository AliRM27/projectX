import express from "express";
import { getHome } from "../controllers/homeControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getHome);

export default router;
