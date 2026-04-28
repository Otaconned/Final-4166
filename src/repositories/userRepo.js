import prisma from '../config/db.js';

export async function createUser(data) {
    try {
        const newUser = await prisma.user.create({
            data: data,
            omit: { password: true },
        });
        return newUser;
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('Account with this email already exists');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function getUserByEmail(email) {
    return prisma.user.findUnique({
        where: { email },
    });
}

export async function getUserById(id) {
    return prisma.user.findUnique({
        where: { id },
        omit: { password: true },
    });
}