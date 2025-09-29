import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

// Global cached connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectdb = async () => {
  // If already connected, return the cached connection
  if (cached.conn) {
    return cached.conn;
  }

  // If connection promise exists, await it
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10s timeout
    }).then((mongooseInstance) => {
      console.log("MongoDB connected");
      return mongooseInstance;
    }).catch((err) => {
      console.log("MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectdb;
