import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IQuestion extends Document {
  _id: Types.ObjectId;
  description: string;
  subject: string;
  category: string[];
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

const questionSchema: Schema<IQuestion> = new Schema({
  description: {
    type: String,
    required: [true, "Please provide a description for the question"],
  },
  subject: {
      type: String,
      required: [true, "Please select a subject"]
  },
  category: {
    type: [String],
    required: [true, "Please provide at least one category for the question"],
  },
  options: {
    type: [
      {
        text: {
          type: String,
          required: [true, "Please provide text for the option"],
        },
        isCorrect: {
          type: Boolean,
          required: [true, "Please specify if this option is correct"],
        },
      },
    ],
    validate: {
      validator: function (v: { text: string; isCorrect: boolean }[]) {
        
        if (v.length !== 4) {
          return false;
        }

        const correctOptions = v.filter((option) => option.isCorrect);
        return correctOptions.length === 1;
      },
      message:
        "A question must have exactly 4 options, and exactly one of them must be correct.",
    },
  },
});

const Question: Model<IQuestion> =
  mongoose.models?.Question || mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
