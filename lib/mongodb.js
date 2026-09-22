import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.__csiMongoose;
if (!cached) {
  cached = global.__csiMongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local");
  }
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 1500,
        connectTimeoutMS: 1500,
        dbName: MONGODB_URI.split("/").pop().split("?")[0] || "csi-vit"
      })
      .then((m) => m)
      .catch((err) => {
        // Reset the promise so a future request can retry once the DB is up.
        cached.promise = null;
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
