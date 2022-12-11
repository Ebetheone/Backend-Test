import mongoose, { Document, Schema } from "mongoose";

export interface IOrlogo extends Document {
  id: string;
  orlogo: Int32Array;
}

const orlogoSchema = new Schema({
  orlogo: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
export const Orlogo = mongoose.model<IOrlogo>("Orlogo", orlogoSchema);
