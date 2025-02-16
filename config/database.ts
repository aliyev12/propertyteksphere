import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If the database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is connected");
    return;
  }

  // Connect to MongoDB
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      connected = true;
    } else {
      throw new Error("MONGODB_URI is not set in the environment variables.");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
