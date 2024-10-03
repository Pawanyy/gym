import Joi from "joi";
import appConfig from "./../config/config.js";

const createWorkoutSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name is required.',
            'any.required': 'Name is required.',
        }),
    description: Joi.string()
        .required()
        .messages({
            'string.base': 'Description must be a string.',
            'string.empty': 'Description is required.',
            'any.required': 'Description is required.',
        }),
    image: Joi.string().optional().custom((value, helpers) => {
        // Regular expression to check if it's a valid URL
        const urlRegex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
        // Regular expression to check if it's a valid Base64 string
        const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/]+={0,2}$/;

        if (urlRegex.test(value) || base64Regex.test(value)) {
            return value; // Valid, return the original value
        }
        return helpers.error('any.invalid', { message: 'Image must be a valid URL or Base64 encoded string' });
    }).messages({
        'any.invalid': 'Image must be a valid URL or Base64 encoded string',
    }),
    muscles: Joi.array()
        .items(Joi.string().valid(...appConfig.muscleEnums))
        .required()
        .messages({
            'any.only': `Muscles must be one of the following: ${appConfig.muscleEnums.join(', ')}.`,
            'array.base': 'Muscles must be an array.',
            'any.required': 'Muscles are required.',
        }),
    duration: Joi.number()
        .required()
        .messages({
            'number.base': 'Duration must be a number.',
            'any.required': 'Duration is required.',
        }),
    sets: Joi.number()
        .required()
        .messages({
            'number.base': 'Sets must be a number.',
            'any.required': 'Sets is required.',
        }),
    reps: Joi.number()
        .required()
        .messages({
            'number.base': 'Reps must be a number.',
            'any.required': 'Reps is required.',
        }),
    difficulty: Joi.string()
        .valid('easy', 'medium', 'hard')
        .required()
        .messages({
            'string.base': 'Difficulty must be a string.',
            'any.only': 'Difficulty must be one of the following: easy, medium, hard.',
            'any.required': 'Difficulty is required.',
        }),
    instructions: Joi.string()
        .optional()
        .messages({
            'string.base': 'Instructions must be a string.',
        }),
});

const updateWorkoutSchema = Joi.object({
    name: Joi.string()
        .messages({
            'string.base': 'Name must be a string.',
        }),
    description: Joi.string()
        .messages({
            'string.base': 'Description must be a string.',
        }),
    image: Joi.string().optional().custom((value, helpers) => {
        // Regular expression to check if it's a valid URL
        const urlRegex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
        // Regular expression to check if it's a valid Base64 string
        const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/]+={0,2}$/;

        if (urlRegex.test(value) || base64Regex.test(value)) {
            return value; // Valid, return the original value
        }
        return helpers.error('any.invalid', { message: 'Image must be a valid URL or Base64 encoded string' });
    }).messages({
        'any.invalid': 'Image must be a valid URL or Base64 encoded string',
    }),
    muscles: Joi.array()
        .items(Joi.string().valid(...appConfig.muscleEnums))
        .messages({
            'any.only': `Muscles must be one of the following: ${appConfig.muscleEnums.join(', ')}.`,
            'array.base': 'Muscles must be an array.',
            'any.required': 'Muscles are required.',
        }),
    duration: Joi.number()
        .messages({
            'number.base': 'Duration must be a number.',
        }),
    sets: Joi.number()
        .messages({
            'number.base': 'Sets must be a number.',
        }),
    reps: Joi.number()
        .messages({
            'number.base': 'Reps must be a number.',
        }),
    difficulty: Joi.string()
        .valid('easy', 'medium', 'hard')
        .messages({
            'string.base': 'Difficulty must be a string.',
            'any.only': 'Difficulty must be one of the following: easy, medium, hard.',
        }),
    instructions: Joi.string()
        .optional()
        .messages({
            'string.base': 'Instructions must be a string.',
        }),
}).min(1).unknown();


export { createWorkoutSchema, updateWorkoutSchema };
