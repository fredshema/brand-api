import mongoose from "mongoose";
import connection from "../services/database";

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

articleSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "article",
});

articleSchema.post("findOneAndDelete", async function () {
  const article = this as any;
  await connection.model("Comment").deleteMany({ article: article._id });
});

export const Article = connection.model("Article", articleSchema);
