import express from "express";
import { getPlans, getPlansBySize, updatePlan, deletePlan } from "../Controller/planController.js";

const router = express.Router();

router.get("/plans", getPlans);
router.get("/plans/:size", getPlansBySize);
router.put("/plans/:id", updatePlan);
router.delete("/plans/:id", deletePlan);



export default router;