import prisma from '../config/db.js';

export async function getAll({ status, userId, userRole }) {
    const where = {};

    if (status) where.status = status;
    if (userRole !== 'ADMIN') where.authorId = userId;

    const displays = await prisma.display.findMany({
        where,
        include: {
            _count: { select: { items: true } },
        },
        orderBy: { updatedAt: 'desc' }
    });
    return displays;
}

export async function getById(id) {
    const display = await prisma.display.findUnique({
        where: { id },
        include: {
            items: { where: { status: 'active' } },
            comments: {
                include: { author: { select: { email: true } } },
                orderBy: { createdAt: 'desc' },
                take: 5
            },
            author: { select: { email: true } }
        }
    });
    return display;
}

export async function create(displayData) {
    return prisma.display.create({
        data: displayData,
    });
}

export async function update(id, displayData) {
    try {
        const updatedDisplay = await prisma.display.update({
            where: { id },
            data: displayData,
        });
        return updatedDisplay;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id) {
    try {
        const deletedDisplay = await prisma.display.delete({
            where: { id },
        });
        return deletedDisplay;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}