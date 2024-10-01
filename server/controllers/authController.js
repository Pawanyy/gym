import BaseController from './baseController.js';
import User from '../models/User.js';
import crypto from 'crypto';
import { registrationSchema, loginSchema, forgetPasswordSchema, resetPasswordSchema, changePasswordSchema } from '../validation/authValidation.js';
import { generateResetToken, generateToken } from './../utils/appUtils.js';
import emailQueue from '../services/EmailQueue.js';

export default class AuthController extends BaseController {
    constructor() {
        super();
    }

    userRegistration = async (req, res) => {
        try {
            const { error, value: payload } = registrationSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const { name, username, email, password, phone } = payload;

            const user = new User({
                name,
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password,
                phone
            });

            await user.save();
            return res.json(this.respondSuccess(user, "User registered successfully"));
        } catch (err) {
            throw err;
        }
    }

    login = async (req, res) => {
        try {
            const { error, value: payload } = loginSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const { username, password, role } = payload;

            const user = await User.findOne({
                $or: [
                    { username: username.toLowerCase() },
                    { email: username.toLowerCase() }
                ],
                role: role,
                isDeleted: false
            });

            if (!user || !(await user.comparePassword(password))) {
                return res.json(this.respondError("Invalid credentials", 401));
            }

            const tokenData = generateToken(user);

            user.lastLogin = Date.now();
            const updatedUser = await user.save();

            const { password: PSS, ...rest } = updatedUser._doc;

            return res.json(this.respondSuccess({ tokenInfo: tokenData, userInfo: rest }, "Token generated successfully"));
        } catch (err) {
            throw err;
        }
    }

    changePassword = async (req, res) => {
        try {
            const { error, value: payload } = changePasswordSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const { currentPassword, newPassword } = payload;

            const user = await User.findOne({ _id: req.user.id, isDeleted: false });

            if (!user) {
                return res.json(this.respondError("Invalid User Record!", 400));
            }

            if (!(await user.comparePassword(currentPassword))) {
                return res.json(this.respondError("Invalid current password", 400));
            }

            user.password = newPassword;
            await user.save();

            return res.json(this.respondSuccess(null, "Password changed successfully"));
        } catch (err) {
            throw err;
        }
    }

    forgetPassword = async (req, res) => {
        try {
            const { error, value: payload } = forgetPasswordSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const user = await User.findOne({ email: payload.email.toLowerCase(), isDeleted: false });
            if (!user) {
                return res.json(this.respondError("User with this email does not exist", 404));
            }

            const resetToken = await generateResetToken(user);

            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

            await emailQueue.add({
                service: "contact:create",
                to: payload.email,
                subject: 'Password Reset Request',
                text: `To reset your password, click on this link: ${resetLink}`,
                html: `<p>To reset your password, click on this link: <a href="${resetLink}">${resetLink}</a></p>`,
            });

            return res.json(this.respondSuccess(null, "Password reset link is sent to your Email."));
        } catch (err) {
            throw err;
        }
    }

    resetPassword = async (req, res) => {
        try {
            const { error, value: payload } = resetPasswordSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const { token } = req.query

            if (!token) {
                return res.json(this.respondError("token is required", 400));
            }

            const user = await User.findOne({
                passwordResetToken: token,
                passwordResetExpires: { $gt: Date.now() },
                isDeleted: false
            });

            if (!user) {
                return res.json(this.respondError("Token is invalid or has expired", 400));
            }

            user.password = payload.password;
            user.passwordResetToken = null;
            user.passwordResetExpires = null;
            await user.save();

            return res.json(this.respondSuccess(null, "Password reset successfully"));
        } catch (err) {
            throw err;
        }
    }
}
