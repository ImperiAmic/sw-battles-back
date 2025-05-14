import { NextFunction, Request, Response } from "express";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../ServerError/ServerError.js";

const handleEndpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new ServerError(statusCodes.NOT_FOUND, "Endpoint not found");

  next(error);
};

export default handleEndpointNotFound;
