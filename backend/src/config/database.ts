import mongoose from "mongoose";
import logger from "./logger";
import config from ".";

const connectDatabase = async (): Promise<void> => {
  const mongoUri = config.MONGO_URI;

  if (!mongoUri) {
    logger.error("MONGO_URI is not defined in environment variables. Please set it.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    logger.info("Successfully connected to MongoDB.");

    mongoose.connection.on("error", (err) => {
      logger.error("Mongoose default connection error: " + err);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("Mongoose default connection disconnected.");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("Mongoose default connection disconnected through app termination.");
      process.exit(0);
    });
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDatabase;
