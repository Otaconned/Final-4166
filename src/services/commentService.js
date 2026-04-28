import {
    getAll, 
    getById,
    create,
    update,
    remove
} from '../repositories/commentRepo.js';

export async function getAllComments(options) {
    return getAll(options);
}

export async function getCommentById(id) {
    const comment = await getById(id);
    if (comment) return comment;
    else {
        const error = new Error(`Comment ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createComment(commentData) {
    return create(commentData);
}

export async function updateComment(id, updateData) {
    const updatedComment = await update(id, updateData);
    if (updatedComment) return updatedComment;
    else {
        const error = new Error(`Comment ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteComment(id) {
    const deletedComment = await remove(id);
    if (deletedComment) return;
    else {
        const error = new Error(`Comment ${id} not found`);
        error.status = 404;
        throw error;
    }
}