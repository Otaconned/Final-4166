import { getById as getDisplayById } from '../repositories/displayRepo.js';
import { getById as getItemById } from '../repositories/displayItemRepo.js';
import { getById as getCommentById } from '../repositories/commentRepo.js';


export async function authorizeDisplayOwnership(req, res, next) {
    const id = parseInt(req.params.id);
    const display = await getDisplayById(id);

    if (!display) {
        const error = new Error(`Display ${id} not found`);
        error.status = 404;
        return next(error);
    }

    if (display.authorId !== req.user.id && req.user.role !== 'ADMIN' && req.user.role !== 'MANAGER') {
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        return next(error);
    }
    next();
}

export async function authorizeItemOwnership(req, res, next) {
    const id = parseInt(req.params.id);
    const item = await getItemById(id);

    if (!item) {
        const error = new Error(`Display item ${id} not found`);
        error.status = 404;
        return next(error);
    }

    if (item.authorId !== req.user.id && req.user.role !== 'ADMIN' && req.user.role !== 'MANAGER') {
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        return next(error);
    }
    next();
}

export async function authorizeCommentOwnership(req, res, next) {
    const id = parseInt(req.params.id);
    const comment = await getCommentById(id);

    if (!comment) {
        const error = new Error(`Comment ${id} not found`);
        error.status = 404;
        return next(error);
    }

    if (comment.authorId !== req.user.id && req.user.role !== 'ADMIN' && req.user.role !== 'MANAGER') {
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        return next(error);
    }
    next();
}