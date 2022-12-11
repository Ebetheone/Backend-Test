import mongoose, { Document, Schema } from "mongoose";

export interface IZarlaga extends Document {
  id: string;
  zarlaga: Int32Array;
}

const zarlagaSchema = new Schema({
  zarlaga: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
export const Zarlaga = mongoose.model<IZarlaga>("Zarlaga", zarlagaSchema);
