const fs = require("fs");
const path = require("path");
import type { Task } from "@prisma/client";


const FILE_PATH = path.join(__dirname, "../data.json");

const readData = async (): Promise<Task[]> => {
  try {
    const content = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
};

module.exports = readData;