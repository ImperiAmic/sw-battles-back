import "dotenv/config";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 6001;

startServer(port);
