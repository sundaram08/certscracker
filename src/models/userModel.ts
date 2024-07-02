import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    name: string,
    profilePic: string,
    testAttempted: Types.ObjectId[],
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
    testsAttempted: [
      {
        type: Schema.Types.ObjectId,
        ref: "Test",
      },
    ]
  });
  
  const User: Model<IUser> =
    mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
  
  export default User;