import {
    getAllDisplayItems,
    getDisplayItemById,
    createItem,
    updateItem,
    deleteItem
} from '../services/displayItemService.js';

export async function getAllDisplayItemsHandler(req, res) {
    const { displayId, status } = req.query;
    const options = {
        displayId,
        status,
        userId: req.user.id,
        userRole: req.user.role
    };
    const items = await getAllDisplayItems(options);
    res.status(200).json(items);
}

export async function getDisplayItemByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const item = await getDisplayItemById(id);
    res.status(200).json(item);
}

export async function createItemHandler(req, res) {
    const { productName, plu, status, location, displayId } = req.body;
    const newItem = await createItem(
        { productName, plu, status, location, displayId }, 
        req.user.id
    );
    res.status(201).json(newItem);
}

export async function updateItemHandler(req, res) {
    const id = parseInt(req.params.id);
    const { productName, plu, quantity, status, location } = req.body;
    const updatedItem = await updateItem(
        id, 
        { productName, plu, quantity, status, location }, 
        req.user.id
    );
    res.status(200).json(updatedItem);
}

export async function deleteItemHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteItem(id, req.user.id);
    res.status(204).json({ message: 'Display item deleted successfully' });
}