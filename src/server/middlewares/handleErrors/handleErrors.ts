import "dotenv/config";
import createDebug from "debug";
import { NextFunction, Request, Response } from "express";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../ServerError/ServerError.js";

const debug = createDebug("battles:server:error");

const handleErrors = (
  error: ServerError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  debug(error.message);
  debug(error.stack);

  res.status(error.statusCode ?? statusCodes.INTERNAL_SERVER_ERROR).json({
    error:
      error instanceof ServerError && error.message
        ? error.message
        : "Server error",
  });
};

export default handleErrors;
