import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import env from "./config/env";
import connectDatabase from "./config/database";
import corsOptions from "./config/corsOptions";
import logger from "./config/logger";

const app: Application = express();

import errorHandler from "./middlewares/errorHandler";

// routes
import authRoutes from "./modules/auth/routes/auth.route";

// connect to MongoDB
connectDatabase();

app.use(
  morgan("tiny", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

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
  app.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}.`));
});

// if any connection error occurs
mongoose.connection.on("error", (err) => {
  console.error(err.message);
  // logEvents(err.message, "mongo-error.log");
});
