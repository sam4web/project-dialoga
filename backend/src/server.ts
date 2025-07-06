import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import corsOptions from "./lib/utils/cors-options";
import connectDB from "./lib/utils/connect-db";

const app = express();
const PORT = process.env.PORT || 5000;

import logger, { logEvents } from "./middlewares/logger.middleware";
import errorHandler from "./middlewares/error-handler.middleware";

// routes
import indexRoutes from "./routes/index.route";

// connect to MongoDB
connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api", indexRoutes);

// catch 404 and forward to error handler
app.all("/*splat", (request: Request, response: Response) => {
  response.status(404);
  if (request.accepts("text")) {
    response.type("text").send("Resource not found. Please check the URL.");
    return;
  }
  response.json({ message: "Resource not found" });
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

// connect to mongoDB
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB.");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});

// if any connection error occurs
mongoose.connection.on("error", (err) => {
  console.error(err.message);
  logEvents(err.message, "mongo-error.log");
});
