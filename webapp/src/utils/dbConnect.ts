// @ts-check
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_DB_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_DB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("Creating new database connection connection pool... ⏳");
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      console.log("Database connected successfully ✅");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("Failed to connect database ❌", e);
    throw e;
  }

  return cached.conn;
};