import http from "http";
import app from "./app";
import { connectDatabase, logger } from "./config";
import { config } from "./config";
import { initSocketIO } from "./socket";

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
    connectDatabase();
    logger.info("Database connection established.");

    // --- Initialize Socket.IO ---
    initSocketIO(server);
    logger.info("Socket.IO initialized");

    // --- Start HTTP Server ---
    server.listen(config.PORT, () => {
      logger.info(`Server listening on port ${config.PORT} in ${config.ENV} mode.`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") throw error;

  const bind = typeof config.PORT === "string" ? "Pipe " : "Port " + config.PORT;
  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges.`);
      process.exit(1);
    case "EADDRINUSE":
      logger.error(`${bind} is already in use.`);
      process.exit(1);
    default:
      throw error;
  }
});

bootstrap();
