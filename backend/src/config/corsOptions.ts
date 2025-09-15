import cors from "cors";
import env from "./env";
import logger from "./logger";

const dynamicOriginCheck = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
  if (env.NODE_ENV === "development") {
    callback(null, true);
  } else {
    if (env.NODE_ENV === "production")
      if (!origin || env.ALLOWED_ORIGINS.has(origin)) {
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
  optionsSuccessStatus: 24,
};

export default corsOptions;
