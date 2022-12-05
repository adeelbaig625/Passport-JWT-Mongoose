const config = require("config");
const db = config.get("mongoURI");
const mongoose = require("mongoose");
// const db = process.env.MONGO_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected at ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
