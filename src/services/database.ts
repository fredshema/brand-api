import * as dotenv from "dotenv";
import * as mongoose from "mongoose";

dotenv.config();

function getMongoDbName() {
  switch (process.env.NODE_ENV) {
    case "test":
      return process.env.MONGO_DB_NAME + "-test";
    default:
      return process.env.MONGO_DB_NAME;
  }
}

const connection = mongoose.createConnection(process.env.MONGO_URI as string, {
  dbName: getMongoDbName(),
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

process.on("exit", async () => {
  await connection.close();
});

export default connection;
