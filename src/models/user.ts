import mongoose from "mongoose";
import connection from "../services/database";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false}
});

export const User = connection.model("User", userSchema);