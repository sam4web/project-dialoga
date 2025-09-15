import http from "http";

import app from "./app";
import config from "./config";
import logger from "./config/logger";
import connectDatabase from "./config/database";

const server = http.createServer(app);

const handleProcessEvents = () => {
  process.on("uncaughtException", (error: Error) => {
    logger.error(`Uncaught Exception: ${error.message}`, { stack: error.stack });
    process.exit(1);
  });
  process.on("unhandledRejection", (reason: Error | any) => {
    logger.error(`Unhandled Rejection: ${reason.message || reason}`, { stack: reason.stack });
    process.exit(1);
  });
};

const bootstrap = async () => {
  try {
    handleProcessEvents();

    // --- Database Connection ---
    logger.info("Attempting to connect to database...");
    await connectDatabase();
    logger.info("Database connection established.");

    // --- Initialize Socket.IO ---
    // here...

    // --- Start HTTP Server ---
    server.listen(config.PORT);
  } catch (err) {}
};
