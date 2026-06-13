// ll
import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/corwa';

// Prevent multiple connections in Next.js dev hot-reload
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: typeof mongoose | undefined;
}

let cached = global._mongooseConn;

export async function connectDB() {
  if (cached && mongoose.connection.readyState === 1) {
    return cached;
  }

  await mongoose.connect(MONGODB_URI);
  cached = mongoose;
  global._mongooseConn = cached;
  return cached;
}
