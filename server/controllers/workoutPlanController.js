import BaseController from './baseController.js';
import { createWorkoutPlanSchema } from '../validation/workoutplanValidation.js';
import WorkoutPlan from '../models/WorkoutPlan.js';
import { aggregateWithPagination, paginateAndSearch } from '../utils/appUtils.js';
import mongoose from 'mongoose';
import Workout from '../models/Workout.js';


export default class WorkoutController extends BaseController {
    constructor() {
        super();
    }

    getMyWorkoutPlans = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const userId = req.user.id;
            const searchQuery = { isDeleted: false, createdBy: new mongoose.Types.ObjectId(userId) };

            const pipeline = [
                { $match: searchQuery },
                {
                    $lookup: {
                        from: 'workouts',
                        localField: 'exercises',
                        foreignField: '_id',
                        as: 'exercises',
                    },
                },
            ];

            const { documents, total, page: currentPage, totalPages } = await aggregateWithPagination(
                mongoose.model('WorkoutPlan'),
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

    getWorkoutPlan = async (req, res) => {
        try {
            const workoutPlanId = req.params.workoutPlanId;
            const isObjectId = mongoose.isValidObjectId(workoutPlanId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Workout Plan Record!", 404));
            }

            const pipeline = [
                { $match: { _id: new mongoose.Types.ObjectId(workoutPlanId), isDeleted: false } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                { $unwind: '$user' },
                {
                    $project: {
                        'user.password': 0,
                    }
                },
                {
                    $lookup: {
                        from: 'workouts',
                        localField: 'exercises',
                        foreignField: '_id',
                        as: 'exercises',
                    },
                },
            ];

            const workoutPlan = await WorkoutPlan.aggregate(pipeline);

            if (workoutPlan.length <= 0) {
                return res.json(this.respondError("WorkoutPlan not Found!", 404));
            }

            return res.json(this.respondSuccess(workoutPlan[0], "Data fetched successfully"));
        } catch (err) {
            throw err;
        }
    }

    getWorkoutPlans = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const searchQuery = { isDeleted: false };

            const pipeline = [
                { $match: searchQuery },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                { $unwind: '$user' },
                {
                    $project: {
                        'user.password': 0,
                    }
                },
                {
                    $lookup: {
                        from: 'workouts',
                        localField: 'exercises',
                        foreignField: '_id',
                        as: 'exercises',
                    },
                },
            ];

            const { documents, total, page: currentPage, totalPages } = await aggregateWithPagination(
                mongoose.model('WorkoutPlan'),
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

    createWorkoutPlan = async (req, res) => {
        try {
            const { error, value: payload } = createWorkoutPlanSchema.validate(req.body);
            if (error) {
                return res.json(this.handleValidationError(error));
            }

            const { title, description, muscles, difficulty } = payload;
            const userId = req.user.id;

            const workoutType = muscles.length > 1 ? "multiMuscle" : "singleMuscle";

            const workouts = await Workout.find({
                muscles: { $in: muscles },
                difficulty: difficulty,
            }).limit(5);

            if (!workouts.length) {
                return res.json(this.respondError("No workouts found for the specified muscles and difficulty.", 400));
            }

            const exercises = workouts.map(w => w._id);
            const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);

            const newWorkoutPlan = new WorkoutPlan({
                title,
                description,
                duration: totalDuration,
                exercises,
                createdBy: userId,
                workoutType,
                targetMuscles: muscles,
                difficulty,
            });

            const createdWorkoutPlan = await newWorkoutPlan.save();

            return res.json(this.respondSuccess({ ...createdWorkoutPlan._doc }, "Workout plan created successfully."));
        } catch (err) {
            // Catch and throw any unexpected errors
            console.error(err);
        }
    };


    deleteWorkoutPlan = async (req, res) => {
        try {
            const workoutPlanId = req.params.workoutPlanId;
            const isObjectId = mongoose.isValidObjectId(workoutPlanId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid WorkoutPlan Record!", 404));
            }

            const result = await WorkoutPlan.findOneAndUpdate({ _id: workoutPlanId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });

            if (!result) {
                return res.json(this.respondError("WorkoutPlan not Found!", 404));
            }

            return res.json(this.respondSuccess(null, "WorkoutPlan deleted successfully"));
        } catch (err) {
            throw err;
        }
    }

    deleteMyWorkoutPlan = async (req, res) => {
        try {
            const workoutPlanId = req.params.workoutPlanId;
            const isObjectId = mongoose.isValidObjectId(workoutPlanId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid WorkoutPlan Record!", 404));
            }

            const userId = req.user.id;
            const searchQuery = { _id: workoutPlanId, isDeleted: false, createdBy: new mongoose.Types.ObjectId(userId) };

            const result = await WorkoutPlan.findOneAndUpdate(searchQuery, { $set: { isDeleted: true } }, { new: true });

            if (!result) {
                return res.json(this.respondError("WorkoutPlan not Found!", 404));
            }

            return res.json(this.respondSuccess(null, "WorkoutPlan deleted successfully"));
        } catch (err) {
            throw err;
        }
    }
}
