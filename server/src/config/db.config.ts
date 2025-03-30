import mongoose from "mongoose";

const connect = async (MONGO_URL: string) => {
   try {
      const { connection } = await mongoose.connect(MONGO_URL);
      console.log(`Successfully connected to database:${connection.host}`);
   } catch (error) {
      console.log("Failed to connect to database", error);
   }
};

export const db = { connect };
