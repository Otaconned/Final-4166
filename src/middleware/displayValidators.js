import { param, body, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
    param('id')
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer'),
    
    handleValidationErrors,
];

export const validateCreateDisplay = [
    body('name')
        .exists({ values: 'falsy' })
        .withMessage('Name is required')
        .bail()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),

    body('location')
        .exists({ values: 'falsy' })
        .withMessage('Location is required')
        .bail()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage('Location must be at least 3 characters long'),

    body('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Status must be either active or inactive'),

    handleValidationErrors,
];

export const validateUpdateDisplay = [
    body('name')
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),

    body('location')
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage('Location must be at least 3 characters long'),

    body('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Status must be either active or inactive'),

    handleValidationErrors,
];

export const validateDisplayQuery = [
    query('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Status must be either active or inactive'),

    handleValidationErrors,
];