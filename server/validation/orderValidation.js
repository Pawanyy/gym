import Joi from "joi";

const createOrderSchema = Joi.object({
    planId: Joi.string().required().messages({
        'string.empty': 'OrderId is required',
        'string.base': 'OrderId must be a string',
    })
});

export { createOrderSchema };
