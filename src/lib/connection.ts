import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    if (!process.env.MONGO_CONNECTION_URL) {
      throw new Error(
        "MONGO_CONNECTION_URL environment variable is not defined."
      );
    }
    const db = await mongoose.connect(process.env.MONGO_CONNECTION_URL);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};
