import {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} from '../services/commentService.js';

export async function getAllCommentsHandler(req, res) {
    const { displayId, limit } = req.query;
    const options = {
        displayId,
        limit,
        userId: req.user.id,
        userRole: req.user.role
    };
    const comments = await getAllComments(options);
    res.status(200).json(comments);
}

export async function getCommentByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const comment = await getCommentById(id);
    res.status(200).json(comment);
}

export async function createCommentHandler(req, res) {
    const { content, actionType, displayId, itemId } = req.body;
    const newComment = await createComment({
        content,
        actionType: actionType || 'note',
        displayId,
        itemId: itemId || null,
        authorId: req.user.id
    });
    res.status(201).json(newComment);
}

export async function updateCommentHandler(req, res) {
    const id = parseInt(req.params.id);
    const { content } = req.body;
    const updatedComment = await updateComment(id, { content });
    res.status(200).json(updatedComment);
}

export async function deleteCommentHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteComment(id);
    res.status(204).json({ message: 'Comment deleted successfully' });
}