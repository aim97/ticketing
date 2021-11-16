import mongoose from 'mongoose';

// This interface defines the properties needed to create a new user
export interface UserAttrs {
  email: string;
  password: string;
};

// This interface defines the properties that a User document contains
export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
};

// An interface for the model used to describe the methods we want to add on it
export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
