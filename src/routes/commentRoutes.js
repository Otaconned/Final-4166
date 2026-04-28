import express from 'express';
import {
    getAllCommentsHandler,
    getCommentByIdHandler,
    createCommentHandler,
    updateCommentHandler,
    deleteCommentHandler
} from '../controllers/commentController.js';

import {
    validateCommentId,
    validateCreateComment,
    validateUpdateComment,
    validateCommentQuery
} from '../middleware/commentValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeCommentOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', authenticate, validateCommentQuery, getAllCommentsHandler);
router.get('/:id', authenticate, validateCommentId, getCommentByIdHandler);
router.post('/', authenticate, validateCreateComment, createCommentHandler);
router.put('/:id', authenticate, validateCommentId, authorizeCommentOwnership, validateUpdateComment, updateCommentHandler);
router.delete('/:id', authenticate, validateCommentId, authorizeCommentOwnership, deleteCommentHandler);

export default router;