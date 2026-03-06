import type { Task, Priority } from "@prisma/client";
const prisma = require("../lib/prisma");

const getTasks = async (priority?: Priority, search?: string): Promise<Task[]> => {
  return await prisma.task.findMany({
    where: {
      priority: priority,
      title: search ? { contains: search, mode: "insensitive" } : undefined
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

const createTask = async ( title?: string, description?: string, priority?: Priority): Promise<Task[]> => {
    return await prisma.task.create({
        data: {title, priority, description}
    })
}

module.exports = {
    getTasks,
    createTask
}