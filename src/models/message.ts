import mongoose from "mongoose";
import connection from "../services/database";

const messageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
})

export const Message = connection.model("Message", messageSchema);