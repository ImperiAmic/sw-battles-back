import "dotenv/config";
import startServer from "./server/startServer.js";
import connectToDatabase from "./database/connectToDatabase.js";

const port = process.env.PORT ?? 6001;
const databaseConnectionString = process.env.DATABASE_CONNECTION_STRING;

if (!databaseConnectionString) {
  throw new Error("Missing DB connection string");
}

await connectToDatabase(databaseConnectionString);
startServer(port);
