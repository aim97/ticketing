import mongoose, { ConnectOptions } from 'mongoose';
import User from './models/user';

const db = {
  connect: () => mongoose.connect('mongodb://auth-mongo-srv:27017/auth'),
  disconnect: () => mongoose.disconnect(),
  users: User,
};

export default db;