import express from "express";
import { findNearBloodBanks } from "../controllers/bloodBank.controller.js";

const router = express.Router();
router.get("/bloodBanks/nearby", findNearBloodBanks);

export default router;
