import Joi from "joi";

const loginSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, and one number.',
        }),
    role: Joi.string().valid("admin", "user").default("user")
        .messages({
            'any.only': 'Role must be either "user" or "admin"'
        }),
});

const registrationSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must be at most 30 characters long',
        }),

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username is required',
            'string.alphanum': 'Username must contain only alphanumeric characters',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username must be at most 30 characters long',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),

    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, and one number',
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Confirm password must match the password',
            'string.empty': 'Confirm password is required',
        }),

    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.base': 'Phone must be a string',
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be a 10-digit number',
        }),
});

const forgetPasswordSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),
});

const resetPasswordSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, and one number',
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Confirm password must match the password',
            'string.empty': 'Confirm password is required',
        }),
});

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, and one number',
        }),
    newPassword: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .invalid(Joi.ref('currentPassword'))
        .required()
        .messages({
            'any.invalid': 'New Password cannot be same as current password',
            'string.empty': 'New Password is required',
            'string.min': 'New Password must be at least 8 characters long',
            'string.pattern.base': 'New Password must include at least one uppercase letter, one lowercase letter, and one number',
        }),
});

export { loginSchema, registrationSchema, forgetPasswordSchema, resetPasswordSchema, changePasswordSchema };