const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const swaggerDocument = YAML.load(path.join(__dirname, "/swagger.yaml"));

const router = require("./api");
const { logger } = require("./utils/logger");
const { errorHandler } = require("./middleware/error-handler");

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = 3000;

logger.info("🤖 Initializing middleware");

app.use(bodyParser.json());
app.use(morgan("tiny", { stream: logger.stream }));
app.use("/", router);
app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve the application at the given port
app.listen(port, () => {
  logger.info(`🎧 Listening at http://localhost:${port}/`);
});
