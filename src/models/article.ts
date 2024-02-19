import mongoose from "mongoose";
import connection from "../services/database";

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    likes: { type: Number, default: 0 },
});

export const Article = connection.model("Article", articleSchema);