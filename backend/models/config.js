const mongoose = require("mongoose");

const mongoDB = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

module.exports = connectDB;
