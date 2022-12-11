import mongoose, { Document, Schema } from "mongoose";

export interface IOrlogo extends Document {
  orlogo: Int32Array;
}

const orlogoSchema = new Schema({
  orlogo: {
    type: String,
    required: true,
  },
});
export const Orlogo = mongoose.model<IOrlogo>("Orlogo", orlogoSchema);
