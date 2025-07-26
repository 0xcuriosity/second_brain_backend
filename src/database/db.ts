import mongoose from "mongoose";
const DATABASE_URI =
  process.env.DATABASE_URI ||
  "mongodb+srv://admin:admin@cluster0.vmcqmwz.mongodb.net/";
export const connectDB = () => {
  mongoose.connect(DATABASE_URI);
  console.log("connected to DB");
};
