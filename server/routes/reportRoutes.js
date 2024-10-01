import express from 'express';
import ReportController from '../controllers/reportController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();
const reportController = new ReportController();

router.get("/dash", authMiddleware(['admin']), asyncHandler(reportController.getDashReport));

export default router;
