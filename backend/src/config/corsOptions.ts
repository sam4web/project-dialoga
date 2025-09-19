import cors from "cors";
import logger from "./logger";
import config from ".";

const dynamicOriginCheck = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
  if (config.ENV === "development") {
    callback(null, true);
  } else {
    if (config.ENV === "production")
      if (!origin || config.ALLOWED_ORIGINS.has(origin)) {
        callback(null, true);
      } else {
        logger.warn(`CORS: Blocked access from unknown origin: ${origin}`);
        callback(new Error("Not allowed by CORS."));
      }
  }
};

const corsOptions: cors.CorsOptions = {
  origin: dynamicOriginCheck,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

export default corsOptions;
