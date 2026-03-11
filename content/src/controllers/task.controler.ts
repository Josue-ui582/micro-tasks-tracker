const taskService = require("../services/task.service");
import type { Request, Response } from "express";
import console = require("node:console");

const getTasks = async (req: Request, res: Response) => {
    const {priority, search, status} = req.query;
    try {
        const tasks = await taskService.getTasks(
            priority as any,
            search as string | undefined,
            status as string
        );
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
}

const createTasks = async (req: Request, res: Response) => {
    const { title, description, priority } = req.body;
    try {
        const task = await taskService.createTask(title, description, priority);
        if (res.headersSent) return;
        return res.status(201).json(task);
    } catch (err ) {
        console.error("Erreur Prisma :", err);
        if (!res.headersSent) {
            return res.status(500).json({ error: "Failed to create task" });
        }
    }
}

const updateTaskStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const task = await taskService.updateTask(id, status);
        res.status(201).json(task);
    } catch (err) {
        console.error("Prisma Error :", err);
        res.status(500).json({error: "Failled to update task"});
    }
}

module.exports = {
    getTasks,
    createTasks,
    updateTaskStatus
}