import BaseController from './baseController.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { createUserSchema, updateUserSchema } from '../validation/userValidation.js';
import { paginateAndSearch } from '../utils/appUtils.js';

export default class UserController extends BaseController {
    constructor() {
        super();
    }

    getUser = async (req, res) => {
        try {
            const userId = req.params.userId;
            const isObjectId = mongoose.isValidObjectId(userId);

            const query = isObjectId ? { _id: userId, isDeleted: false } : { username: userId, isDeleted: false };
            const user = await User.findOne(query, { password: 0 });

            if (!user) {
                return res.json(this.respondError("User not Found!", 404));
            }

            return res.json(this.respondSuccess(user, "Data fetched successfully"));
        } catch (err) {
            throw err;
        }
    }

    getUsers = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const searchQuery = req.query.search ? { username: new RegExp(req.query.search, 'i'), isDeleted: false } : { isDeleted: false };

            const { documents, total, page: currentPage, totalPages } = await paginateAndSearch(
                mongoose.model('User'),
                searchQuery,
                page,
                limit,
                { password: 0 }
            );

            return res.json(this.respondSuccess({
                records: documents,
                total,
                page: currentPage,
                totalPages,
            }, "Data fetched successfully"));

        } catch (err) {
            throw err;
        }
    }

    createUser = async (req, res) => {
        try {
            const { error, value: payload } = createUserSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const { username, email } = payload;

            const user = new User({
                ...payload,
                username: username.toLowerCase(),
                email: email.toLowerCase(),
            });

            await user.save();
            return res.json(this.respondSuccess(user, "User created successfully"));
        } catch (err) {
            throw err;
        }
    }

    updateUser = async (req, res) => {
        try {
            const { error, value: payload } = updateUserSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const userId = req.params.userId;

            const user = await User.findOne({ _id: userId, isDeleted: false });

            if (!user) {
                return res.json(this.respondError("User not found", 404));
            }

            const { username, email } = payload;

            for (const key in payload) {
                user[key] = payload[key];
            }

            if (username) user.username = username.toLowerCase();
            if (email) user.email = email.toLowerCase();

            const updatedUser = await user.save();

            const { password, ...rest } = updatedUser._doc;
            return res.json(this.respondSuccess({ ...rest }, "User updated successfully"));
        } catch (err) {
            throw err;
        }
    }

    deleteUser = async (req, res) => {
        try {
            const userId = req.params.userId;
            const isObjectId = mongoose.isValidObjectId(userId);
            const query = isObjectId ? { _id: userId } : { username: userId };

            if (userId === req.user.id) {
                return res.json(this.respondError("Cannot delete Login Account!", 400));
            }

            const result = await User.findOneAndUpdate({ _id: userId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });

            if (!result) {
                return res.json(this.respondError("User not Found!", 404));
            }

            return res.json(this.respondSuccess(null, "User deleted successfully"));
        } catch (err) {
            throw err;
        }
    }

    getProfile = async (req, res) => {
        try {
            const userId = req.user.id;

            const user = await User.findOne({ _id: userId, isDeleted: false }, { password: 0 });

            if (!user) {
                return res.json(this.respondError("User Profile not Found!", 404));
            }

            return res.json(this.respondSuccess(user, "User Profile fetched successfully"));
        } catch (err) {
            throw err;
        }
    }

    updateProfile = async (req, res) => {
        try {
            const { error, value: payload } = updateUserSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const userId = req.user.id;

            const user = await User.findOne({ _id: userId, isDeleted: false });

            if (!user) {
                return res.json(this.respondError("User Profile not found", 404));
            }

            const { username, email } = payload;

            for (const key in payload) {
                user[key] = payload[key];
            }

            if (username) user.username = username.toLowerCase();
            if (email) user.email = email.toLowerCase();

            const updatedUser = await user.save();

            const { password, ...rest } = updatedUser._doc;

            return res.json(this.respondSuccess({ ...rest }, "User Profile updated successfully"));
        } catch (err) {
            throw err;
        }
    }
}
