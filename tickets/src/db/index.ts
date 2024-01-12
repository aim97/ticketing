import mongoose from 'mongoose';
import { Ticket } from './models/Ticket';

export const db = {
  connect: () => mongoose.connect(process.env.MONGO_URI!),
  disconnect: () => mongoose.disconnect(),
  Ticket,
};
