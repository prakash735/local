import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("❌ MONGO_URL is not defined in environment variables");
}

// Global cached connection (for serverless Lambda reuse)
let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectdb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10s timeout
    }).then((mongooseInstance) => {
      console.log("✅ MongoDB connected");
      return mongooseInstance;
    }).catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectdb;
