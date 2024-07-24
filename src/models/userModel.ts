import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    name: string,
    profilePic: string,
    totalScore: number,
    activeDays: string[];
}

const userSchema: Schema = new Schema({
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    name: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    totalScore:{
      type: Number
    },
    activeDays: [
      {
        type: String,
      },
    ]
  });
  
  const User: Model<IUser> =
    mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
  
  export default User;