import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import handleHealthCheck from "../middlewares/handleHealthCheck/healthCheck.js";

const app = express();

app.use(helmet());
app.use(morgan("dev"));

app.use(handleHealthCheck);

export default app;
