import BaseController from './baseController.js';
import { createOrderSchema } from '../validation/orderValidation.js';
import Order from '../models/Order.js';
import { aggregateWithPagination, paginateAndSearch } from '../utils/appUtils.js';
import mongoose from 'mongoose';
import Plan from './../models/Plan.js';


export default class OrderController extends BaseController {
    constructor() {
        super();
    }

    myOrders = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const userId = new mongoose.Types.ObjectId(req.user.id); // Convert user ID to ObjectId

            // Define the aggregation pipeline
            const pipeline = [
                { $match: { user: userId, isDeleted: false } },  // Match orders for the user
                {
                    $lookup: {  // Join with the Plan collection to get plan details
                        from: 'plans',  // The name of the 'Plan' collection in the DB
                        localField: 'plan',  // The 'plan' field in Order schema
                        foreignField: '_id',  // The '_id' field in Plan schema
                        as: 'plan'  // Output field name for the joined data
                    }
                },
                { $unwind: '$plan' }  // Unwind the plan array (since $lookup returns an array)
            ];

            // Use the reusable aggregateWithPagination helper function
            const { documents, total, page: currentPage, totalPages } = await aggregateWithPagination(
                mongoose.model('Order'),
                pipeline,
                page,
                limit
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
    };

    getOrder = async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const isObjectId = mongoose.isValidObjectId(orderId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Order Record!", 404));
            }

            const order = await Order.findOne({ _id: orderId, isDeleted: false });

            if (!order) {
                return res.json(this.respondError("Order not Found!", 404));
            }

            return res.json(this.respondSuccess(order, "Data fetched successfully"));
        } catch (err) {
            throw err;
        }
    }

    getOrders = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const searchQuery = { isDeleted: false };

            const pipeline = [
                { $match: searchQuery },  // Match search query
                {
                    $lookup: {
                        from: 'users',  // Collection name for users
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                { $unwind: '$user' },  // Unwind the user array
                {
                    $lookup: {
                        from: 'plans',  // Collection name for plans
                        localField: 'plan',
                        foreignField: '_id',
                        as: 'plan',
                    },
                },
                { $unwind: '$plan' }
            ];



            const { documents, total, page: currentPage, totalPages } = await aggregateWithPagination(
                mongoose.model('Order'),
                pipeline,
                page,
                limit
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

    createOrder = async (req, res) => {
        try {
            const { error, value: payload } = createOrderSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const { planId } = payload;
            const userId = req.user.id;

            const isObjectId = mongoose.isValidObjectId(planId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Plan Record!", 404));
            }

            const existingOrder = await Order.findOne({
                user: userId,
                plan: planId,
                isDeleted: false
            });

            if (existingOrder) {
                return res.json(this.respondError("You have already purchased this plan.", 400))
            }

            const plan = await Plan.findOne({ _id: planId, isDeleted: false });

            if (!plan) {
                return res.json(this.respondError("Invalid Plan.", 400))
            }

            const newOrder = new Order({
                plan: planId,
                user: userId,
                price: plan.price,
                interval: plan.interval,
                paymentStatus: "paid"
            });

            const createdOrder = await newOrder.save();

            return res.json(this.respondSuccess({ ...createdOrder._doc }, "Order created successfully."));
        } catch (err) {
            throw err;
        }
    }

    updateOrder = async (req, res) => {
        try {
            const { error, value: payload } = updateOrderSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const orderId = req.params.orderId;
            const isObjectId = mongoose.isValidObjectId(orderId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Order Record!", 404));
            }

            const order = await Order.findOne({ _id: orderId, isDeleted: false });

            if (!order) {
                return res.json(this.respondError("Order not found", 404));
            }

            for (const key in payload) {
                order[key] = payload[key];
            }

            const updatedOrder = await order.save();

            return res.json(this.respondSuccess({ ...updatedOrder._doc }, "Order updated successfully"));
        } catch (err) {
            throw err;
        }
    }

    deleteOrder = async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const isObjectId = mongoose.isValidObjectId(orderId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Order Record!", 404));
            }

            const result = await Order.findOneAndUpdate({ _id: orderId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });

            if (!result) {
                return res.json(this.respondError("Order not Found!", 404));
            }

            return res.json(this.respondSuccess(null, "Order deleted successfully"));
        } catch (err) {
            throw err;
        }
    }
}
