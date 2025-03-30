import { getEnv } from "./../utils/get-env";

const appConfig = () => ({
   NODE_ENV: getEnv("NODE_ENV", "development"),
   BASE_URL: getEnv("BASE_URL"),
   MONGO_URL: getEnv("MONGO_URL"),
   PORT: getEnv("PORT", "3000"),
   JWT: {
      SECRET: getEnv("SECRET"),
      EXPIRES_IN: getEnv("EXPIRES_IN"),
      REFRESH_SECRET: getEnv("REFRESH_SECRET"),
      REFRESH_EXPIRES_IN: getEnv("REFRESH_EXPIRES_IN"),
   },
   FRONTEND_ORIGIN_URL: getEnv("FRONTEND_ORIGIN_URL"),
});

export const config = appConfig();
