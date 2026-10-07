import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/srikannathal_db';

  try {
    console.log(`Connecting to MongoDB at: ${uri}...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('MongoDB Connected Successfully to:', mongoose.connection.name);
  } catch (error: any) {
    console.warn('Could not connect to target MongoDB URI:', error.message);
    console.log('Starting MongoMemoryServer in-memory fallback database...');
    
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();
      console.log('MongoMemoryServer initialized at:', memoryUri);
      await mongoose.connect(memoryUri);
      console.log('Connected to fallback In-Memory MongoDB successfully.');
    } catch (memErr: any) {
      console.error('Failed to start MongoMemoryServer:', memErr.message);
      process.exit(1);
    }
  }
};
