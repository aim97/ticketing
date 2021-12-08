import mongoose from 'mongoose';

export const db = {
  connect: () => mongoose.connect(process.env.MONGO_URI!),
  disconnect: () => mongoose.disconnect(),
};
