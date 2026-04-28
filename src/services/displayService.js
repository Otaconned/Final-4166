import {
    getAll,
    getById,
    create,
    update,
    remove
} from '../repositories/displayRepo.js';
import { create as createComment } from '../repositories/commentRepo.js';

export async function getAllDisplays(options) {
    return getAll(options);
}

export async function getDisplayById(id) {
    const display = await getById(id);
    if (display) return display;
    else {
        const error = new Error(`Display ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createDisplay(displayData, userId) {
    const newDisplay = await create({ ...displayData, authorId: userId });

    await createComment({
        content: `Display ${displayData.name} created`,
        actionType: 'add',
        displayId: newDisplay.id,
        authorId: userId
    });

    return newDisplay;
}

export async function updateDisplay(id, displayData, userId) {
    const updatedDisplay = await update(id, displayData);

    if (updatedDisplay) {
        await createComment({
            content: `Display ${displayData.name} updated`,
            actionType: 'update',
            displayId: id,
            authorId: userId
        });
        return updatedDisplay;
    } else {
        const error = new Error(`Display ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteDisplay(id) {
    const deletedDisplay = await remove(id);
    if (deletedDisplay) return;
    else {
        const error = new Error(`Display ${id} not found`);
        error.status = 404;
        throw error;
    }
}