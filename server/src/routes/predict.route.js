import express from "express";
import { predictSymptoms } from "../controllers/predict.controller.js";
import { authenticate } from "../utils/authenticate.js";

const router = express.Router();

// router.get("/symtoms", authenticate, predictSymptoms);
router.post("/symptoms", predictSymptoms);

export default router;
