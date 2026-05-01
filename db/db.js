const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("database connected");
  } catch (error) {
    console.log("error connecting to database", error);
    process.exit(1);
  }
};

module.exports = dbConnection;