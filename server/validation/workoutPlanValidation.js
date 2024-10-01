import Joi from "joi";
import appConfig from "../config/config.js";

const createWorkoutPlanSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            'string.base': 'Title must be a string.',
            'string.empty': 'Title is required.',
            'any.required': 'Title is required.',
        }),
    description: Joi.string()
        .required()
        .messages({
            'string.base': 'Description must be a string.',
            'string.empty': 'Description is required.',
            'any.required': 'Description is required.',
        }),
    muscles: Joi.array()
        .items(Joi.string().valid(...appConfig.muscleEnums))
        .required()
        .messages({
            'any.only': `Muscles must be one of the following: ${appConfig.muscleEnums.join(', ')}.`,
            'array.base': 'Muscles must be an array.',
            'any.required': 'Muscles are required.',
        }),
    // duration: Joi.number()
    //     .required()
    //     .messages({
    //         'number.base': 'Duration must be a number.',
    //         'any.required': 'Duration is required.',
    //     }),
    difficulty: Joi.string()
        .valid('easy', 'medium', 'hard')
        .required()
        .messages({
            'string.base': 'Difficulty must be a string.',
            'any.only': 'Difficulty must be one of the following: easy, medium, hard.',
            'any.required': 'Difficulty is required.',
        }),
});

export { createWorkoutPlanSchema };
