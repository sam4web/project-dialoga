import winston from "winston";
import fs from "fs";
import env from "./env";

const logDir = "logs";

const logger = winston.createLogger({
  level: env.NODE_ENV === "development" ? "debug" : "info",
  defaultMeta: { service: "dialoga-backend" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message} ${info.stack ? `\n${info.stack}` : ""}`
        )
      ),
      level: env.NODE_ENV === "production" ? "error" : "debug",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.json()
      ),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.json()
      ),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [new winston.transports.File({ filename: "logs/exceptions.log" })],
  rejectionHandlers: [new winston.transports.File({ filename: "logs/rejections.log" })],
  exitOnError: false,
});

if (env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message} ${info.stack ? `\n${info.stack}` : ""}`
        )
      ),
    })
  );
}

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

export default logger;
