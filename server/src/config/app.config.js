const { getEnv } = require("../utils/get-env");

const appConfig = () => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),
    BASE_URL: getEnv("BASE_URL"),
    MONGO_URL: getEnv(
        "MONGO_URL",
        "mongodb://127.0.0.1:27017/makeup-ecommerce"
    ),
    PORT: getEnv("PORT", 3000),
    JWT: {
        SECRET: getEnv("SECRET", "default_secret"),
        EXPIRES_IN: getEnv("EXPIRES_IN", "3600"),
        REFRESH_SECRET: getEnv("REFRESH_SECRET", "default_refresh_secret"),
        REFRESH_EXPIRES_IN: getEnv("REFRESH_EXPIRES_IN", "86400"),
    },
    FRONTEND_ORIGIN_URL: getEnv("FRONTEND_ORIGIN_URL", "http://localhost:3000"),
});

module.exports.config = appConfig();
