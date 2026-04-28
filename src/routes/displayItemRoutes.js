import express from 'express';
import {
    getAllDisplayItemsHandler,
    getDisplayItemByIdHandler,
    createItemHandler,
    updateItemHandler,
    deleteItemHandler
} from '../controllers/displayItemController.js';

import {
    validateItemId,
    validateCreateItem,
    validateUpdateItem,
    validateItemQuery
} from '../middleware/displayItemValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeDisplayOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', authenticate, validateItemQuery, getAllDisplayItemsHandler);
router.get('/:id', authenticate, validateItemId, getDisplayItemByIdHandler);
router.post('/', authenticate, validateCreateItem, createItemHandler);
router.put('/:id', authenticate, validateItemId, authorizeDisplayOwnership, validateUpdateItem, updateItemHandler);
router.delete('/:id', authenticate, validateItemId, authorizeDisplayOwnership, deleteItemHandler);

export default router;