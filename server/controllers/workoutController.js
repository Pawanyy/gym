import BaseController from './baseController.js';
import { createWorkoutSchema, updateWorkoutSchema } from '../validation/workoutValidation.js';
import Workout from '../models/Workout.js';
import { paginateAndSearch } from '../utils/appUtils.js';
import mongoose from 'mongoose';


export default class WorkoutController extends BaseController {
    constructor() {
        super();
    }

    getWorkout = async (req, res) => {
        try {
            const workoutId = req.params.workoutId;
            const isObjectId = mongoose.isValidObjectId(workoutId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Workout Record!", 404));
            }

            const workout = await Workout.findOne({ _id: workoutId, isDeleted: false });

            if (!workout) {
                return res.json(this.respondError("Workout not Found!", 404));
            }

            return res.json(this.respondSuccess(workout, "Data fetched successfully"));
        } catch (err) {
            throw err;
        }
    }

    getWorkouts = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const searchQuery = { isDeleted: false };

            const { documents, total, page: currentPage, totalPages } = await paginateAndSearch(
                mongoose.model('Workout'),
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

    createWorkout = async (req, res) => {
        try {
            const { error, value: payload } = createWorkoutSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const newWorkout = new Workout({ ...payload });

            const createdWorkout = await newWorkout.save();

            return res.json(this.respondSuccess({ ...createdWorkout._doc }, "Workout created successfully."));
        } catch (err) {
            throw err;
        }
    }

    updateWorkout = async (req, res) => {
        try {
            const { error, value: payload } = updateWorkoutSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const workoutId = req.params.workoutId;
            const isObjectId = mongoose.isValidObjectId(workoutId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Workout Record!", 404));
            }

            const workout = await Workout.findOne({ _id: workoutId, isDeleted: false });

            if (!workout) {
                return res.json(this.respondError("Workout not found", 404));
            }

            for (const key in payload) {
                workout[key] = payload[key];
            }

            const updatedWorkout = await workout.save();

            return res.json(this.respondSuccess({ ...updatedWorkout._doc }, "Workout updated successfully"));
        } catch (err) {
            throw err;
        }
    }

    deleteWorkout = async (req, res) => {
        try {
            const workoutId = req.params.workoutId;
            const isObjectId = mongoose.isValidObjectId(workoutId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Workout Record!", 404));
            }

            const result = await Workout.findOneAndUpdate({ _id: workoutId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });

            if (!result) {
                return res.json(this.respondError("Workout not Found!", 404));
            }

            return res.json(this.respondSuccess(null, "Workout deleted successfully"));
        } catch (err) {
            throw err;
        }
    }
}
