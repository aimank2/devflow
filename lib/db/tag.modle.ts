import { Schema, model, Document, Types, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Types.ObjectId[];
  followers: Types.ObjectId[];
  createdAt: Date;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Tag = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
