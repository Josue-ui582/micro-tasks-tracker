import type { Priority, Task } from "@prisma/client";
const fs = require("fs/promises")
const path = require("path");
const { readData } = require("../../utils/readData");
const { withLock } = require("../../utils/withLock");

const FILE_PATH = path.join(__dirname, "../../data.json");

const getTasks = async (priority?: Priority, search?: string): Promise<Task[]> => {
  const tasks: Task[] = await readData();
  
  return tasks
    .filter(t => !priority || t.priority === priority)
    .filter(t => !search || t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const createTask = async (title: string, description: string, priority: Priority): Promise<Task> => {
  return await withLock(async () => {
    const tasks: Task[] = await readData();

    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description: description,
      priority,
      status: "En cours" as any,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Task;

    tasks.push(newTask);
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
    return newTask;
  });
};

const updateTask = async (id: string, statusFromUI: string): Promise<Task> => {
  const statusMap: Record<string, any> = {
    "En cours": "En_cours",
    "Terminée": "Terminee"
  };

  const prismaStatus = statusMap[statusFromUI];
  if (!prismaStatus) throw new Error(`Le statut "${statusFromUI}" n'est pas reconnu.`);

  return await withLock(async () => {
    const tasks: Task[] = await readData();
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) throw new Error("Task not found");

    tasks[index] = { 
      ...tasks[index], 
      status: prismaStatus, 
      updatedAt: new Date() 
    } as Task;

    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
    return tasks[index];
  });
};

module.exports = {
  getTasks,
  createTask,
  updateTask
};
