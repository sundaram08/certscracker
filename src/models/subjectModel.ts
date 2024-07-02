import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ISubject extends Document {
    _id: Types.ObjectId;
    name: string;
    categories: string[];
    image: string;
  }
  
  
  const subjectSchema: Schema<ISubject> = new Schema({
    name:{
      type: String,
      required: [true, "Please provide a subject name"],
    },
    categories: {
      type: [String],
      required: [true, "Please provide at least one category"],
    },
    image:{
        type: String,
        required: [true,"Please provide an image for reference"]
    }
  });
  
  const Subject: Model<ISubject> =
    mongoose.models?.Subject || mongoose.model<ISubject>("Subject", subjectSchema);
  
  export default Subject;