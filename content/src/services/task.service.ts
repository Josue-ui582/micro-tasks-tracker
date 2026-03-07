import type { Task, Priority } from "@prisma/client";
import Status = require("@prisma/client");
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

const createTask = async ( title?: string, description?: string, priority?: Priority): Promise<Task> => {
    return await prisma.task.create({
        data: {title, description, priority}
    })
};

const updateTask = async (id : string, statusFromUI: string) => {
  const statusMap: Record<string, string> = {
    "En cours": "En_cours",
    "Terminée": "Terminee"
  };

  const prismaStatus = statusMap[statusFromUI];

  if (!prismaStatus) {
    throw new Error(`Le statut "${statusFromUI}" n'est pas reconnu. Utilisez "En cours" ou "Terminée".`);
  }

  return await prisma.task.update({
    where: { 
      id: id 
    },
    data: { 
      status: prismaStatus
    }
  });
};

module.exports = {
    getTasks,
    createTask,
    updateTask
}