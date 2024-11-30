import mongoose from "mongoose";
import User from "./user";
const promptSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

export const Prompt =
  mongoose.models.Prompt || mongoose.model("Prompt", promptSchema);
