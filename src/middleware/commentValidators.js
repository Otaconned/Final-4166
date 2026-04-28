import { param, body, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateCommentId = [
    param('id')
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer'),

    handleValidationErrors,
];

export const validateCreateComment = [
    body('content')
        .exists({ values: 'falsy' })
        .withMessage('Content is required')
        .bail()
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage('Content cannot be empty'),

    body('actionType')
        .optional()
        .isIn(['note', 'add', 'update', 'remove'])
        .withMessage('Action type must be either note, add, update, or remove'),

    body('displayId')
        .exists({ values: 'falsy' })
        .withMessage('Display ID is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Display ID must be a positive integer'),

    body('displayItemId')
        .exists({ values: 'falsy' })
        .withMessage('Display Item ID is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Display Item ID must be a positive integer'),

    handleValidationErrors,
];

export const validateUpdateComment = [
    body('content')
        .exists({ values: 'falsy' })
        .withMessage('Content is required')
        .bail()
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage('Content cannot be empty'),

    handleValidationErrors,
];

export const validateCommentQuery = [
    query('displayId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Display ID must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be a positive integer between 1 and 100'),

    handleValidationErrors
];