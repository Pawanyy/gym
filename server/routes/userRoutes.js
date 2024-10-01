import express from 'express';
import UserController from '../controllers/userController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();
const userController = new UserController();

router.get("/me", authMiddleware([]), asyncHandler(userController.getProfile));
router.patch("/me", authMiddleware([]), asyncHandler(userController.updateProfile));

router.get("/", authMiddleware(['admin']), asyncHandler(userController.getUsers));
router.post("/", authMiddleware(['admin']), asyncHandler(userController.createUser));
router.get("/:userId", authMiddleware(['admin']), asyncHandler(userController.getUser));
router.patch("/:userId", authMiddleware(['admin']), asyncHandler(userController.updateUser));
router.delete("/:userId", authMiddleware(['admin']), asyncHandler(userController.deleteUser));

export default router;
