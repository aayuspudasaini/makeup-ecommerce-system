import dotenv from "dotenv";

dotenv.config();

export const getEnv = (key: string, defaultValue: string = ""): string => {
   const value = process.env[key];
   if (value === undefined) {
      if (defaultValue) {
         return defaultValue;
      }
      throw new Error(`Environment Variables ${key} is not defined`);
   }
   return value;
};
