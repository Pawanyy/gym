import express from 'express';
import AuthController from './../controllers/authController.js';
import asyncHandler from './../middlewares/asyncHandler.js';
import authMiddleware from './../middlewares/authMiddleware.js';


const router = express.Router();
const authController = new AuthController();

router.post('/register', asyncHandler(authController.userRegistration));

router.post("/login", asyncHandler(authController.login));
router.post("/forgotPassword", asyncHandler(authController.forgetPassword));
router.post("/resetPassword", asyncHandler(authController.resetPassword));

router.post("/changePassword", authMiddleware(['user', 'admin']), asyncHandler(authController.changePassword));


router.get('/admin', authMiddleware(['admin']), (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Welcome, Admin!'
    });
});

router.get('/user', authMiddleware(['user', 'admin']), (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: `Welcome, ${req.user.username}!`
    });
});

router.get('/profile', (req, res) => {
    res.json({});
});

export default router;
