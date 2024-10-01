import BaseController from './baseController.js';
import { createPlanSchema, updatePlanSchema } from '../validation/planValidation.js';
import Plan from '../models/Plan.js';
import { paginateAndSearch } from '../utils/appUtils.js';
import mongoose from 'mongoose';


export default class PlanController extends BaseController {
    constructor() {
        super();
    }

    getPlan = async (req, res) => {
        try {
            const planId = req.params.planId;
            const isObjectId = mongoose.isValidObjectId(planId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Plan Record!", 404));
            }

            const plan = await Plan.findOne({ _id: planId, isDeleted: false });

            if (!plan) {
                return res.json(this.respondError("Plan not Found!", 404));
            }

            return res.json(this.respondSuccess(plan, "Data fetched successfully"));
        } catch (err) {
            throw err;
        }
    }

    getPlans = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const searchQuery = req.query.search ? { title: new RegExp(req.query.search, 'i'), isDeleted: false } : { isDeleted: false };

            const { documents, total, page: currentPage, totalPages } = await paginateAndSearch(
                mongoose.model('Plan'),
                searchQuery,
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

    createPlan = async (req, res) => {
        try {
            const { error, value: payload } = createPlanSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const newPlan = new Plan({ ...payload });

            const createdPlan = await newPlan.save();

            return res.json(this.respondSuccess({ ...createdPlan._doc }, "Plan created successfully."));
        } catch (err) {
            throw err;
        }
    }

    updatePlan = async (req, res) => {
        try {
            const { error, value: payload } = updatePlanSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const planId = req.params.planId;
            const isObjectId = mongoose.isValidObjectId(planId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Plan Record!", 404));
            }

            const plan = await Plan.findOne({ _id: planId, isDeleted: false });

            if (!plan) {
                return res.json(this.respondError("Plan not found", 404));
            }

            for (const key in payload) {
                plan[key] = payload[key];
            }

            const updatedPlan = await plan.save();

            return res.json(this.respondSuccess({ ...updatedPlan._doc }, "Plan updated successfully"));
        } catch (err) {
            throw err;
        }
    }

    deletePlan = async (req, res) => {
        try {
            const planId = req.params.planId;
            const isObjectId = mongoose.isValidObjectId(planId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Plan Record!", 404));
            }

            const result = await Plan.findOneAndUpdate({ _id: planId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });

            if (!result) {
                return res.json(this.respondError("Plan not Found!", 404));
            }

            return res.json(this.respondSuccess(null, "Plan deleted successfully"));
        } catch (err) {
            throw err;
        }
    }
}
