import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "./config";

import connectDatabase from "./config/database";
import corsOptions from "./config/corsOptions";

const app: Application = express();

import errorHandler from "./middlewares/errorHandler";

// import logger, { logEvents } from "./config/logger";

// routes
import authRoutes from "./modules/auth/routes/auth.route";

// connect to MongoDB
connectDatabase();

// app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);

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
  app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}.`));
});

// if any connection error occurs
mongoose.connection.on("error", (err) => {
  console.error(err.message);
  // logEvents(err.message, "mongo-error.log");
});
