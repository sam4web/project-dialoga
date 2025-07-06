import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.DATABASE_URI as string);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
