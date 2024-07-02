import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectDB = async () => {
  try {
    if (mongoose.connection && mongoose.connections[0].readyState) {
      return;
    }
    const { connection } = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: "CertsCracker",
      }
    );
    console.log("Connected to DB", connection.host);
  } catch (error) {
    console.log(error);
  }
};