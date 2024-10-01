import Joi from "joi";

const createPlanSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title is required',
        'string.base': 'Title must be a string',
    }),

    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
        'string.base': 'Description must be a string',
    }),

    price: Joi.number().min(1).required().messages({
        'number.base': 'Price value must be a number',
        'number.min': 'Price cannot be negative',
    }),

    interval: Joi.string().valid('month', 'year', 'indefinite').required().messages({
        'string.empty': 'Interval is required',
        'any.only': 'Interval must be one of "month", "year", or "indefinite"',
    }),

    features: Joi.array().items(Joi.string()).min(1).required().messages({
        'array.base': 'Features must be an array of strings',
        'array.min': 'At least one feature is required',
    }),
});

const updatePlanSchema = Joi.object({
    title: Joi.string().optional().messages({
        'string.base': 'Title must be a string',
    }),

    description: Joi.string().optional().messages({
        'string.base': 'Description must be a string',
    }),

    price: Joi.number().min(1).optional().messages({
        'number.base': 'Price value must be a number',
        'number.min': 'Price cannot be negative',
    }),

    interval: Joi.string().valid('month', 'year', 'indefinite').optional().messages({
        'string.base': 'Interval must be a string',
        'any.only': 'Interval must be one of "month", "year", or "indefinite"',
    }),

    features: Joi.array().items(Joi.string()).min(1).optional().messages({
        'array.base': 'Features must be an array of strings',
        'array.min': 'At least one feature is required',
    }),
}).min(1).unknown()

export { createPlanSchema, updatePlanSchema };
