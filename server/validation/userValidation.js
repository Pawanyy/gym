import Joi from "joi";

const createUserSchema = Joi.object({
    name: Joi.string().required()
        .messages({
            'any.required': 'Name is required',
            'string.base': 'Name must be a string'
        }),
    username: Joi.string().alphanum().min(3).max(30).required()
        .messages({
            'string.alphanum': 'Username must contain only alphanumeric characters',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username must be at most 30 characters long',
            'any.required': 'Username is required'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string().required()
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
        .messages({
            'any.required': 'Password is required',
            'string.pattern.base': 'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, and one number.',
        }),
    height: Joi.object({
        value: Joi.number().min(0).default(0)
            .messages({
                'number.base': 'Height value must be a number',
                'number.min': 'Height cannot be negative'
            }),
        unit: Joi.string().valid('cm', 'ft/in').default('cm')
            .messages({
                'any.only': 'Height unit must be either "cm" or "ft/in"'
            }),
    }),
    weight: Joi.object({
        value: Joi.number().min(0).default(0)
            .messages({
                'number.base': 'Weight value must be a number',
                'number.min': 'Weight cannot be negative'
            }),
        unit: Joi.string().valid('kg', 'lb').default('kg')
            .messages({
                'any.only': 'Weight unit must be either "kg" or "lb"'
            }),
    }),
    dob: Joi.date().optional()
        .messages({
            'date.base': 'Date of Birth must be a valid date'
        }),
    phone: Joi.string().optional()
        .messages({
            'string.base': 'Phone number must be a string'
        }),
    role: Joi.string().valid('user', 'admin').default('user')
        .messages({
            'any.only': 'Role must be either "user" or "admin"',
        }),
    profilePicture: Joi.string().optional().custom((value, helpers) => {
        // Regular expression to check if it's a valid URL
        const urlRegex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
        // Regular expression to check if it's a valid Base64 string
        const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/]+={0,2}$/;

        if (urlRegex.test(value) || base64Regex.test(value)) {
            return value; // Valid, return the original value
        }
        return helpers.error('any.invalid', { message: 'Profile picture must be a valid URL or Base64 encoded string' });
    }).messages({
        'any.invalid': 'Profile picture must be a valid URL or Base64 encoded string',
    }),
    address: Joi.string().optional()
        .messages({
            'string.base': 'Address must be a string'
        }),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown').default('Unknown')
        .messages({
            'any.only': 'Blood group must be one of the valid types'
        }),
}).unknown();

const updateUserSchema = Joi.object({
    name: Joi.string().optional().messages({
        'string.base': 'Name must be a string'
    }),
    username: Joi.string().alphanum().min(3).max(30).optional().messages({
        'string.alphanum': 'Username must contain only alphanumeric characters',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be at most 30 characters long',
    }),
    email: Joi.string().email().optional().messages({
        'string.email': 'Please provide a valid email address'
    }),
    height: Joi.object({
        value: Joi.number().min(0).default(0).messages({
            'number.base': 'Height value must be a number',
            'number.min': 'Height cannot be negative'
        }),
        unit: Joi.string().valid('cm', 'ft/in').default('cm').messages({
            'any.only': 'Height unit must be either "cm" or "ft/in"'
        }),
    }).optional(),
    weight: Joi.object({
        value: Joi.number().min(0).default(0).messages({
            'number.base': 'Weight value must be a number',
            'number.min': 'Weight cannot be negative'
        }),
        unit: Joi.string().valid('kg', 'lb').default('kg').messages({
            'any.only': 'Weight unit must be either "kg" or "lb"'
        }),
    }).optional(),
    dob: Joi.date().optional().messages({
        'date.base': 'Date of Birth must be a valid date'
    }),
    phone: Joi.string().optional().messages({
        'string.base': 'Phone number must be a string'
    }),
    profilePicture: Joi.string().optional().custom((value, helpers) => {
        const urlRegex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
        const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/]+={0,2}$/;

        if (urlRegex.test(value) || base64Regex.test(value)) return value;
        return helpers.error('any.invalid', { message: 'Profile picture must be a valid URL or Base64 encoded string' });
    }).messages({
        'any.invalid': 'Profile picture must be a valid URL or Base64 encoded string',
    }),
    role: Joi.string().valid('user', 'admin').optional().messages({
        'any.only': 'Role must be either "user" or "admin"'
    }),
    isActive: Joi.boolean().optional().messages({
        'boolean.base': 'isActive must be a boolean value'
    }),
    address: Joi.string().optional().messages({
        'string.base': 'Address must be a string'
    }),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown').optional().messages({
        'any.only': 'Blood group must be one of the valid types'
    })
}).min(1).unknown();


export { createUserSchema, updateUserSchema };