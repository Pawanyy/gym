import express from 'express';
import PlanController from '../controllers/planController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();
const planController = new PlanController();

router.get("/", asyncHandler(planController.getPlans));
router.post("/", authMiddleware(['admin']), asyncHandler(planController.createPlan));

router.get("/:planId", asyncHandler(planController.getPlan));
router.delete("/:planId", authMiddleware(['admin']), asyncHandler(planController.deletePlan));
router.patch("/:planId", authMiddleware(["admin"]), asyncHandler(planController.updatePlan));

export default router;
