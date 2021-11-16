import mongoose from 'mongoose';
import { UserAttrs, UserDoc, UserModel } from './user.types';

const userSchema = new mongoose.Schema<UserDoc>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;