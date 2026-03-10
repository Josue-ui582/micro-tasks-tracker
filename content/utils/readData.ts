const fs = require("fs").promises;
const path = require("path");

const FILE_PATH = path.join(__dirname, "../data.json");

const readData = async () => {
  try {
    const content = await fs.readFile(FILE_PATH, "utf-8");
    if (!content || content.trim() === "") return [];
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
};

module.exports = { readData };
