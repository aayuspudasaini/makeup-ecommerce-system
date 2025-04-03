const dotenv = require("dotenv");

dotenv.config();

const getEnv = (key, defaultValue = "") => {
    const value = process.env[key];
    if (value === undefined) {
        if (defaultValue) {
            return defaultValue;
        }
        throw new Error(
            `Environment variable ${key} is not defined and no default value was provided.`
        );
    }
    return value;
};

module.exports = { getEnv };
