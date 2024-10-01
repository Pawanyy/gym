import express from 'express';
import OrderController from '../controllers/orderController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();
const orderController = new OrderController();

router.get("/", authMiddleware(['user', 'admin']), asyncHandler(orderController.getOrders));
router.post("/", authMiddleware(['user']), asyncHandler(orderController.createOrder));

router.get("/me", authMiddleware(['user', 'admin']), asyncHandler(orderController.myOrders));

router.get("/:orderId", authMiddleware(['user', 'admin']), asyncHandler(orderController.getOrder));
router.delete("/:orderId", authMiddleware(['user', 'admin']), asyncHandler(orderController.deleteOrder));
// router.patch("/:orderId", authMiddleware(["admin"]), asyncHandler(orderController.updateOrder));

export default router;
