import { Schema, model, ObjectId } from "mongoose";

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
});

export const linkModel = model("Link", linkSchema);
