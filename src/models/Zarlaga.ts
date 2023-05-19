import mongoose, { Document, Schema } from "mongoose";

export interface IZarlaga extends Document {
  zarlaga: Int32Array;
  date: Date;
  type: string;
  detail: string;
}

// Zarlag Model

const zarlagaSchema = new Schema({
  zarlaga: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
export const Zarlaga = mongoose.model<IZarlaga>("Zarlaga", zarlagaSchema);
