import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import env from "./config/env";
import corsOptions from "./config/corsOptions";
import logger from "./config/logger";

import errorHandler from "./middlewares/errorHandler";

// routes
// import authRoutes from "./modules/auth/routes/auth.route";
import helmet from "helmet";
import ApiError from "./lib/errors/ApiError";

const app: Application = express();

// connect to MongoDB
// connectDatabase();

// -- MIDDLEWARE SETUP --
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// http request logger
app.use(
  morgan("tiny", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// -- API ROUTES --
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy!",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// app.use("/api/auth", authRoutes);

//  -- ERROR HANDLING --

// catch-all for undefined routes (404 Not Found)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(ApiError.notFound(`Route not found: ${req.originalUrl}`));
});

// pass any unhandled errors to the error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}.`));
