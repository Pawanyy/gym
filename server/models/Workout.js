import mongoose from "mongoose";
import appConfig from "./../config/config.js"

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    muscles: {
        type: [String],
        required: true,
        enum: {
            values: appConfig.muscleEnums,
            message: `Muscles must be one of the following: ${appConfig.muscleEnums.join(', ')}.`,
        },
    },
    duration: {
        type: Number,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
        min: 1,
        default: 3,
    },
    reps: {
        type: Number,
        required: true,
        min: 1,
        default: 10,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    instructions: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        index: true
    }
}, {
    timestamps: true,
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
