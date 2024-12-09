import Joi from 'joi';

export const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Username is required',
        'string.min': 'Username must have at least {#limit} characters',
        'string.max': 'Username cannot exceed {#limit} characters',
    }),
    password: Joi.string().min(6).max(30).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must have at least {#limit} characters',
        'string.max': 'Password cannot exceed {#limit} characters',
    }),
});

export const forgotPasswordSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Username is required',
        'string.min': 'Username must have at least {#limit} characters',
        'string.max': 'Username cannot exceed {#limit} characters',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    }),
});

export const notificationSchema = Joi.object({
    notification_display: Joi.string().required().messages({
        'string.empty': 'Notification display is required'
    }),
    notification_message: Joi.string().min(3).max(150).required().messages({
        'string.empty': 'Notification message is required',
        'string.min': 'Notification must have at least {#limit} characters',
        'string.max': 'Notification cannot exceed {#limit} characters',
    }),
    notification_start_date: Joi.date().required().messages({
        'date.base': 'Notification start date is required',
    }),
    notification_end_date: Joi.date().required().messages({
        'date.base': 'Notification end date is required',
    }),
    notification_start_time: Joi.custom((value, helpers) => {
        if (!value) {
            return helpers.message('Notification start time is required');
        }
        return value;
    }),
    notification_end_time: Joi.custom((value, helpers) => {
        if (!value) {
            return helpers.message('Notification end time is required');
        }
        return value;
    }),
}).custom((value, helpers) => {
    const start = new Date(value.notification_start_date);
    const end = new Date(value.notification_end_date);
    if (end < start) {
        return helpers.error('any.invalid', { message: 'Notification end date must not be before the start date' });
    }
    return value;
});