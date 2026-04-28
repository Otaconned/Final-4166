import {
    getAllDisplays,
    getDisplayById,
    createDisplay,
    updateDisplay,
    deleteDisplay
} from '../services/displayService.js';

export async function getAllDisplaysHandler(req, res) {
    const { status } = req.query;
    const options = {
        status,
        userId: req.user.id,
        userRole: req.user.role
    };
    const displays = await getAllDisplays(options);
    res.status(200).json(displays);
}

export async function getDisplayByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const display = await getDisplayById(id);
    res.status(200).json(display);
}

export async function createDisplayHandler(req, res) {
    const { name, location, status } = req.body;
    const newDisplay = await createDisplay({ name, location, status }, req.user.id);
    res.status(201).json(newDisplay);
}

export async function updateDisplayHandler(req, res) {
    const id = parseInt(req.params.id);
    const { name, location, status } = req.body;
    const updatedDisplay = await updateDisplay(id, { name, location, status }, req.user.id);
    res.status(200).json(updatedDisplay);
}

export async function deleteDisplayHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteDisplay(id);
    res.status(204).json({ message: 'Display deleted successfully' });
}