import mongoose, { Document, Model, Schema, Types } from "mongoose";


export interface ITest extends Document {
  _id: Types.ObjectId;
  subject: string;
  categories: string[];
  marks: string;
  username: string;
}


const testSchema: Schema<ITest> = new Schema({
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
  },
  categories: {
    type: [String],
    required: [true, "Please provide at least one category"],
  },
  marks: {
    type: String,
    required: [true, "Please provide marks"],
  },
  username: {
    type: String,
    required: [true, "Please provide a userID"],
  },
});

const Test: Model<ITest> =
  mongoose.models?.Test || mongoose.model<ITest>("Test", testSchema);

export default Test;
