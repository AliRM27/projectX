import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error and exit the process with failure
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
