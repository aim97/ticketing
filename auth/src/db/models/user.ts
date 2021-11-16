import mongoose from 'mongoose';
import { UserAttrs, UserDoc, UserModel } from './user.types';

import { Password } from '../../lib/Password';

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
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
    versionKey: false,
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hash = await Password.toHash(this.get('password'));
    this.set('password', hash);
  }

  done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;