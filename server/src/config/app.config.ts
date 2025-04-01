import { getEnv } from "./../utils/get-env";

const appConfig = () => ({
   NODE_ENV: getEnv("NODE_ENV", "development"),
   BASE_URL: getEnv("BASE_URL","http://localhost:8000"),
   MONGO_URL: getEnv("MONGO_URL","mongodb://127.0.0.1:27017/makeup-ecommerce"),
   PORT: getEnv("PORT", "8000"),
   // JWT: {
      // SECRET: getEnv("SECRET"),
   //    EXPIRES_IN: getEnv("EXPIRES_IN"),
   //    REFRESH_SECRET: getEnv("REFRESH_SECRET"),
   //    REFRESH_EXPIRES_IN: getEnv("REFRESH_EXPIRES_IN"),
   // },
   // FRONTEND_ORIGIN_URL: getEnv("FRONTEND_ORIGIN_URL"),
});

export const config = appConfig();
