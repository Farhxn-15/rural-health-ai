import express from "express";
import { getProfile } from "../controllers/user.controller.js";
import { authenticate } from "../utils/authenticate.js";

const router = express.Router();

// router.get("/profile", getProfile);
router.get("/profile", authenticate, getProfile);

export default router;
