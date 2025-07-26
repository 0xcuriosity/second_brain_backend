import { Schema, model } from "mongoose";
type ContentType = "youtube" | "twitter";
const contentTypes: ContentType[] = ["youtube", "twitter"];
const contentSchema = new Schema(
  {
    link: { type: String, required: true, unique: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const contentModel = model("Content", contentSchema);
