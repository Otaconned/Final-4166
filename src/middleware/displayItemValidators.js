import { param, body, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateItemId = [
    param('id')
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer'),

    handleValidationErrors,
];

export const validateCreateItem = [
    body('productName')
        .exists({ values: 'falsy' })
        .withMessage('Product name is required')
        .bail()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage('Product name must be at least 3 characters long'),

    body('plu')
        .exists({ values: 'falsy' })
        .withMessage('PLU is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('PLU must be a positive integer'),

    body('quantity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),

    body('status')
        .optional()
        .isIn(['available', 'out_of_stock'])
        .withMessage('Status must be either available or out_of_stock'),
    
    body('displayId')
        .exists({ values: 'falsy' })
        .withMessage('Display ID is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Display ID must be a positive integer'),

    handleValidationErrors,
];

export const validateUpdateItem = [
    body('productName')
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage('Product name must be at least 3 characters long'),

    body('plu')
        .optional()
        .isInt({ min: 1 })
        .withMessage('PLU must be a positive integer'),
    
    body('quantity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),

    body('status')
        .optional()
        .isIn(['available', 'out_of_stock', 'removed'])
        .withMessage('Status must be either available or out_of_stock'),

    handleValidationErrors,
];

export const validateItemQuery = [
    query('displayId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Display ID must be a positive integer'),
    
    query('status')
        .optional()
        .isIn(['available', 'out_of_stock', 'removed'])
        .withMessage('Status must be either available or out_of_stock'),
    
    handleValidationErrors,
];