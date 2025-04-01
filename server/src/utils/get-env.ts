
export const getEnv = (key: string, defaultValue: string = ""): string => {
   const value = process.env[key];
   if (value === undefined) {
      if (defaultValue) {
         console.warn(`Environment variable "${key}" is not defined. Using default value: "${defaultValue}"`);
         return defaultValue;
      }
      throw new Error(`Environment variable "${key}" is not defined and no default value was provided.`);
   }
   return value;
};