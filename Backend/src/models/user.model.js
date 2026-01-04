import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true, 
      index: true // Helps search faster
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true, 
    },
    password: {
      type: String, // Storing as plain text per your request
      required: [true, 'Password is required']
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

export const User = mongoose.model("User", userSchema);