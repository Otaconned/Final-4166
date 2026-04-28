import express from 'express';
import {
    getAllDisplaysHandler,
    getDisplayByIdHandler,
    createDisplayHandler,
    updateDisplayHandler,
    deleteDisplayHandler
} from '../controllers/displayController.js';

import {
    validateId,
    validateCreateDisplay,
    validateUpdateDisplay,
    validateDisplayQuery
} from '../middleware/displayValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeDisplayOwnership } from '../middleware/authorizeOwnership.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', authenticate, validateDisplayQuery, getAllDisplaysHandler);
router.get('/:id', authenticate, validateId, getDisplayByIdHandler);
router.post('/', authenticate, validateCreateDisplay, createDisplayHandler);
router.put('/:id', authenticate, validateId, authorizeDisplayOwnership, validateUpdateDisplay, updateDisplayHandler);
router.delete('/:id', authenticate, validateId, authorizeDisplayOwnership, authorizeRoles('ADMIN', 'MANAGER'), deleteDisplayHandler);

export default router;