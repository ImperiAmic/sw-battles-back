import "dotenv/config";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import battlesRouter from "../battle/router/battleRouter.js";
import handleErrors from "./middlewares/handleErrors/handleErrors.js";
import handleHealthCheck from "./middlewares/handleHealthCheck/healthCheck.js";
import handleCorsPolicy from "./middlewares/handleCorsPolicy/handleCorsPolicy.js";
import handleEndpointNotFound from "./middlewares/handleEndpointNotFound/handleEndpointNotFound.js";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(handleCorsPolicy);

app.get("/", handleHealthCheck);

app.use("/battles", battlesRouter);

app.use(handleEndpointNotFound);
app.use(handleErrors);

export default app;
