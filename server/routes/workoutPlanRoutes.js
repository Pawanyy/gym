import express from 'express';
import WorkoutPlanController from '../controllers/workoutPlanController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();
const workoutPlanController = new WorkoutPlanController();

router.get("/", authMiddleware(['admin', 'user']), asyncHandler(workoutPlanController.getWorkoutPlans));
router.get("/me", authMiddleware(['user']), asyncHandler(workoutPlanController.getMyWorkoutPlans));
router.delete("/me/:workoutPlanId", authMiddleware(['user']), asyncHandler(workoutPlanController.deleteMyWorkoutPlan));
router.post("/", authMiddleware(['user']), asyncHandler(workoutPlanController.createWorkoutPlan));

router.get("/:workoutPlanId", authMiddleware(['user', 'admin']), asyncHandler(workoutPlanController.getWorkoutPlan));
router.delete("/:workoutPlanId", authMiddleware(['admin']), asyncHandler(workoutPlanController.deleteWorkoutPlan));

export default router;
