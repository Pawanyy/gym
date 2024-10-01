import express from 'express';
import WorkoutController from '../controllers/workoutController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();
const workoutController = new WorkoutController();

router.get("/", asyncHandler(workoutController.getWorkouts));
router.post("/", authMiddleware(['admin']), asyncHandler(workoutController.createWorkout));

router.get("/:workoutId", asyncHandler(workoutController.getWorkout));
router.delete("/:workoutId", authMiddleware(['admin']), asyncHandler(workoutController.deleteWorkout));
router.patch("/:workoutId", authMiddleware(["admin"]), asyncHandler(workoutController.updateWorkout));

export default router;
