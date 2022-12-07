import mongoose, { Document, Schema } from "mongoose";

export interface IBudget extends Document {
  orlogo: Int32Array;
  zarlaga: Int32Array;
}

const budgetSchema = new Schema({
  orlogo: {
    type: String,
    required: true,
  },
  zarlaga: {
    type: String,
    required: true,
  },
});
export const Budget = mongoose.model<IBudget>("Budget", budgetSchema);
