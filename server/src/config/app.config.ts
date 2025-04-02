import { getEnv } from "./../utils/get-env";

const appConfig = () => ({
   NODE_ENV: getEnv("NODE_ENV", "development"),
   BASE_URL: getEnv("BASE_URL", "http://localhost:3000"),
   MONGO_URL: getEnv("MONGO_URL", "mongodb://127.0.0.1:27017/makeup-ecommerce"),
   PORT: parseInt(getEnv("PORT", "3000"), 10),
   JWT: {
      SECRET: getEnv("SECRET", "default_secret"), // Add a default value if needed
      EXPIRES_IN: parseInt(getEnv("EXPIRES_IN", "3600"), 10), // Convert to number
      REFRESH_SECRET: getEnv("REFRESH_SECRET", "default_refresh_secret"), // Add a default value
      REFRESH_EXPIRES_IN: parseInt(getEnv("REFRESH_EXPIRES_IN", "86400"), 10), // Convert to number
   },
   FRONTEND_ORIGIN_URL: getEnv("FRONTEND_ORIGIN_URL", "http://localhost:8000"), // Add a default value
});

export const config = appConfig();