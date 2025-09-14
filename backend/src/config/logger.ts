import { NextFunction, Request, Response } from "express";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import * as fs from "node:fs";
import path from "node:path";
import fsPromises from "fs/promises";

const logsDirPath = path.join(__dirname, "..", "..", "logs");

export const logEvents = async (message: string, logFileName: string) => {
  const dateTime = format(new Date(), "yyyy/MM/dd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    if (!fs.existsSync(logsDirPath)) await fsPromises.mkdir(logsDirPath);

    await fsPromises.appendFile(path.join(logsDirPath, logFileName), logItem);
  } catch (err) {
    console.error(err);
  }
};

const logger = (request: Request, response: Response, next: NextFunction) => {
  logEvents(`${request.method}\t${request.url}\t${request.headers.origin}`, "request.log");
  console.log(`${request.method} ${request.path}`);
  next();
};

export default logger;
