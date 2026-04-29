import prisma from '../config/db.js';

export async function getAll({ displayId, limit, userId, userRole }) {
    const where = {};

    if (displayId) where.displayId = parseInt(displayId);

    if (userRole !== 'ADMIN') {
        const userDisplays = await prisma.display.findMany({
            where: { authorId: userId },
            select: { id: true },
        });
        const displayIds = userDisplays.map(d => d.id);
        where.displayId = { in: displayIds };

        if (displayId && !displayIds.includes(parseInt(displayId))) return [];
    }

const comments = await prisma.displayComment.findMany({
    where,
    include: {
        author: { select: { email: true } },
        display: { select: { name: true } },
        displayItem: { select: { productName: true, plu: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: parseInt(limit) || 10
});
return comments;
}

export async function getById(id) {
    const comment = await prisma.displayComment.findUnique({
        where: { id },
        include: {
            author: { select: { email: true } },
            display: true,
            displayItem: { select: { productName: true, plu: true } }
        }
    });
    return comment;
}

export async function create(commentData) {
    return prisma.displayComment.create({
        data: commentData,
    });
}

export async function update(id, updatedData) {
    try {
        const updatedComment = await prisma.displayComment.update({
            where: { id },
            data: updatedData,
        });
        return updatedComment;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id) {
    try {
        const deletedComment = await prisma.displayComment.delete({
            where: { id },
        });
        return deletedComment;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}