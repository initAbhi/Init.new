import mongoose from "mongoose";

export const connectDB = async () => {
  // console.log("connection ready state -",mongoose.connection.readyState)
  await mongoose.connect(process.env.DB_URL);
  console.log("db connected - ", mongoose.connection.readyState);
};
