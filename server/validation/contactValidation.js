import Joi from "joi";

const createContactSchema = Joi.object({
    subject: Joi.string().min(3).max(255).required()
        .messages({
            'string.min': 'Subject must be at least 3 characters long',
            'string.max': 'Subject must be at most 255 characters long',
            'any.required': 'Subject is required'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
    message: Joi.string().min(3).max(512).required()
        .messages({
            'any.required': 'Message is required',
            'string.min': 'Message must be at least 10 characters long',
            'string.max': 'Message must be at most 512 characters long',
        }),
}).unknown();

export { createContactSchema };
