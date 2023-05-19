import mongoose, { Document, Schema } from "mongoose";

export interface IOrlogo extends Document {
  orlogo: Int32Array;
  date: Date;
  type: string;
  detail: string;
}

// Income Model

const orlogoSchema = new Schema({
  orlogo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
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
export const Orlogo = mongoose.model<IOrlogo>("Orlogo", orlogoSchema);
