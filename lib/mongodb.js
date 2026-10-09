import mongoose from "mongoose";

// Accept either MONGODB_URI or MONGO_URI — both are common.
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

// Default database name when the URI doesn't include one (SRV-style URIs
// often come without a path, e.g. mongodb+srv://.../?appName=Cluster0).
const DEFAULT_DB_NAME = process.env.MONGODB_DB || "csi-vit";

function pickDbName(uri) {
  try {
    const afterHost = uri.split("://")[1]?.split("/").slice(1).join("/") || "";
    const path = afterHost.split("?")[0];
    if (path && path.length > 0) return path;
  } catch {}
  return DEFAULT_DB_NAME;
}

let cached = global.__csiMongoose;
if (!cached) {
  cached = global.__csiMongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGO_URI) {
    throw new Error(
      "MongoDB URI not set. Add MONGODB_URI (or MONGO_URI) to .env.local"
    );
  }
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        dbName: pickDbName(MONGO_URI)
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
