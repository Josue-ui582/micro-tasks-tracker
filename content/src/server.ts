const express = require("express");
const cors = require("cors");
const swaggerSpec = require("../src/config/swagger");
const swaggerUi = require("swagger-ui-express");
const taskRoutes = require("./routes/task.routes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/tasks", taskRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});