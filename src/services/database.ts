import * as dotenv from "dotenv";
import * as mongoose from "mongoose";

dotenv.config();

const connection = mongoose.createConnection(process.env.MONGO_URI as string,{
    dbName: process.env.MONGO_DB_NAME,
});

connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

connection.on("close", () => {
    console.log("Disconnected from MongoDB");
});

connection.on("error", (err) => {
    console.error(err);
});

export default connection;