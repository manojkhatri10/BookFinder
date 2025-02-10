import mongoose, { Connection } from "mongoose";

// Your MongoDB URI
const MONGO_URI = "mongodb+srv://manojkhatri:M%40n0j2058@cluster0.u3nz9.mongodb.net/bookfinder?retryWrites=true&w=majority";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// Cached connection for performance optimization
let cached = global.mongoose as { conn: Connection | null; promise: Promise<Connection> | null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Optional timeout settings
    }).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
