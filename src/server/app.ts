import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import handleHealthCheck from "./middlewares/handleHealthCheck/healthCheck.js";
import handleEndpointNotFound from "./middlewares/handleEndpointNotFound/handleEndpointNotFound.js";
import handleErrors from "./middlewares/handleErrors/handleErrors.js";

const app = express();

app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHealthCheck);

app.use(handleEndpointNotFound);
app.use(handleErrors);

export default app;
