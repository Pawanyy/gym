import express from 'express';
import ContactController from '../controllers/contactController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();
const contactController = new ContactController();

router.post("/", asyncHandler(contactController.createContact));

router.get("/:contactId", authMiddleware(['admin']), asyncHandler(contactController.getContact));
router.get("/", authMiddleware(['admin']), asyncHandler(contactController.getContacts));

export default router;
