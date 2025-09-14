import cors from "cors";

const allowedOrigins = new Set(process.env.ALLOWED_ORIGINS?.split(",") || []);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    const isAllowed = !origin || allowedOrigins.has(origin);
    if (isAllowed) callback(null, true);
    else callback(new Error("Not allowed by CORS."));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
