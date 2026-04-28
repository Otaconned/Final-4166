import prisma from '../config/db.js';

export async function getAll({ displayId, status, userId, userRole }) {
    const where = {};

    if (displayId) where.displayId = parseInt(displayId);
    if (status) where.status = status;

    if (userRole !== 'ADMIN') {
        const userDisplays = await prisma.display.findMany({
            where: { authorId: userId },
            select: { id: true },
        });
        const displayIds = userDisplays.map(d => d.id);
        where.displayId = { in: displayIds };

        if (displayId && !displayIds.includes(parseInt(displayId))) return [];
    }

const items = await prisma.displayItem.findMany({
    where,
    include: {
        display: { select: { name: true, location: true } },
        author: { select: { email: true } }
    },
    orderBy: { addedAt: 'desc' }
});
return items;
}

export async function getById(id) {
    const item = await prisma.displayItem.findUnique({
        where: { id },
        include: {
            display: true, 
            author: { select: { email: true } },
            comments: {
                include: { author: { select: { email: true } } },
                orderBy: { createdAt: 'desc' }
            }
        }
    });
    return item;
}

export async function create(itemData) {
    try {
        return await prisma.displayItem.create({
            data: itemData,
        });
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('This item has already been added to this display');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function update(id, updatedData) {
    try {
        const updatedItem = await prisma.displayItem.update({
            where: { id },
            data: updatedData,
        });
        return updatedItem;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

// employs a soft delete because we want to remove the item from the DISPLAY, not from general inventory
export async function remove(id) {
    try {
        const deletedItem = await prisma.displayItem.update({
            where: { id },
            data: { status: 'removed', removedAt: new Date() },
        });
        return deletedItem;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}