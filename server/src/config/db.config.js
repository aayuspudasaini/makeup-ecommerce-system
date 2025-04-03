const { mongoose } = require("mongoose");
const connect = async (MONGO_URL) => {
  try {
    const { connection } = await mongoose.connect(MONGO_URL);
    console.log(`Successfully connected to database:${connection.host}`);
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
};

module.exports.db = { connect };
