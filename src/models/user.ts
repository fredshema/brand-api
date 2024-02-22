import mongoose from "mongoose";
import connection from "../services/database";

export enum Role {
  GUEST = "guest",
  ADMIN = "admin",
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: Object.values(Role), default: Role.GUEST },
  password: { type: String, required: true, select: false },
});

userSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});

userSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "user",
});

userSchema.post("findOneAndDelete", async function () {
  const user = this as any;
  await connection.model("Article").deleteMany({ author: user._id });
  await connection.model("Comment").deleteMany({ user: user._id });
});

export const User = connection.model("User", userSchema);
