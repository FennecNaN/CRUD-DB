const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Crear tarea
router.post('/create', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send({ message: 'Error creating task' });
    }
});

// Todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send({ message: 'Error fetching tasks' });
    }
});

// Buscar una tarea por ID
router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        res.status(500).send({ message: 'Error fetching task by ID' });
    }
});

// Marcar tarea como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error('Error marking task as completed:', error);
        res.status(500).send({ message: 'Error marking task as completed' });
    }
});

// Actualizar solo el titulo de una tarea
router.put('/id/:_id', async (req, res) => {
    try {
        const { title } = req.body;
        const task = await Task.findByIdAndUpdate(req.params._id, { title }, { new: true });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send({ message: 'Error updating task' });
    }
});

// Eliminar una tarea
router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send({ message: 'Error deleting task' });
    }
});


module.exports = router;
