import mongoose from "mongoose";
import appConfig from "./../config/config.js"

const workoutPlanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: { type: Boolean, default: false, index: true },
    workoutType: { type: String, enum: ['singleMuscle', 'multiMuscle'], required: true },
    targetMuscles: {
        type: [String], enum: {
            values: appConfig.muscleEnums,
            message: `Muscles must be one of the following: ${appConfig.muscleEnums.join(', ')}.`,
        }, required: true
    },
}, {
    timestamps: true
});

const workoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema)

export default workoutPlan;