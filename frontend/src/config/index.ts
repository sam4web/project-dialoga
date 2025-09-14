import z from "zod";

const configSchema = z.object({
  VITE_NODE_CONFIG: z.string().default("development"),
  VITE_API_BASE_URL: z.url({ message: "VITE_API_BASE_URL must be a valid URL" }),
});

const config = (() => {
  try {
    return configSchema.parse(import.meta.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Invalid environment variables");
      throw new Error("Environment variable validation failed. Please check your .env files.");
    }
    throw error;
  }
})();

export default config;
