import { handleValidationErrors } from './handleValidationErrors.js';
import { body } from 'express-validator';

export const validateSignUp = [
    body('email')
        .trim()
        .exists({ values: 'falsy' })
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Invalid email format')
        .bail()
        .normalizeEmail(),

    body('password')
        .exists({ values: 'falsy' })
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

    body('role')
        .optional()
        .isIn(['EMPLOYEE', 'MANAGER', 'ADMIN'])
        .withMessage('Role must be either EMPLOYEE, MANAGER, or ADMIN'),

    handleValidationErrors,
];

export const validateLogIn = [
    body('email')
        .trim()
        .exists({ values: 'falsy' })
        .withMessage('Email is required')
        .bail()
        .normalizeEmail(),

    body('password')
        .exists({ values: 'falsy' })
        .withMessage('Password is required'),

    handleValidationErrors,
];