const taskService = require("../services/task.service");
import type { Request, Response } from "express";

const getTasks = async (req: Request, res: Response) => {
    const {priority, search} = req.query;
    try {
        const tasks = await taskService.getTasks(
            priority as any,
            search as string | undefined
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
        res.status(201).json(task);
    } catch (err ) {
        console.error("Erreur Prisma :", err);
        res.status(500).json({ error: "Failed to create task" });
    }
}

module.exports = {
    getTasks,
    createTasks
}