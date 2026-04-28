import {
    getAll,
    getById,
    create,
    update,
    remove
} from '../repositories/displayItemRepo.js';
import { create as createComment } from '../repositories/commentRepo.js';
import { getById as getDisplayById } from '../repositories/displayRepo.js';

export async function getAllDisplayItems(options) {
    return getAll(options);
}

export async function getDisplayItemById(id) {
    const displayItem = await getById(id);
    if (displayItem) return displayItem;
    else {
        const error = new Error(`Display item ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createItem(itemData, userId) {
    const display = await getDisplayById(itemData.displayId);
    if (!display) {
        const error = new Error(`Display ${itemData.displayId} not found`);
        error.status = 404;
        throw error;
    }

    const newItem = await create({ ...itemData, authorId: userId });

    await createComment({
        content: `Item ${itemData.productName} added to display ${display.name}`,
        actionType: 'add',
        displayId: itemData.displayId,
        authorId: userId
    });

    return newItem;
}

export async function updateItem(id, updateData, userId) {
    const updatedItem = await update(id, updateData);

    if (updatedItem) {
        const display = await getDisplayById(updatedItem.displayId);
        await createComment({
            content: `Item ${updateData.productName} updated in display ${display.name}`,
            actionType: 'update',
            displayId: updatedItem.displayId,
            authorId: userId
        });
        return updatedItem;
    } else {
        const error = new Error(`Display item ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteItem(id, userId) {
    const deletedItem = await remove(id);
    if (deletedItem) {
        const display = await getDisplayById(deletedItem.displayId);
        await createComment({
            content: `Item ${deletedItem.productName} removed from display ${display.name}`,
            actionType: 'remove',
            displayId: deletedItem.displayId,
            authorId: userId
        });
        return;
    } else {
        const error = new Error(`Display item ${id} not found`);
        error.status = 404;
        throw error;
    }
}