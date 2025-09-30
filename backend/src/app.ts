import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import { corsOptions, logger } from "./config";
import { ApiError } from "./lib";
import { errorHandler } from "./middlewares";
import { authRouter } from "./modules/auth";
import { userRouter } from "./modules/user";
import { chatRouter } from "./modules/chat";

const app: Application = express();

// --- MIDDLEWARE SETUP ---
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  morgan("tiny", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// --- API ROUTES ---
// health check endpoint
app.get("/health", (request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "Server is healthy!",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// register module routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);

//  --- ERROR HANDLING ---
// catch-all for undefined routes (404 Not Found)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(ApiError.notFound(`Route not found: ${req.originalUrl}`));
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

export default app;
