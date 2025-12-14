const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.DATABASE);
    console.log(`database connected sucessfully: ${conn.connection.host}`);
  } catch (error) {
    console.log("connection failed", error);
  }
};
module.exports = dbconnect;
