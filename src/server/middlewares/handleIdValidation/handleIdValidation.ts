import { NextFunction, Response } from "express";
import { BattleRequest } from "../../../battle/controller/types.js";
import ServerError from "../../ServerError/ServerError.js";
import statusCodes from "../../../globals/statusCodes.js";
import mongoose from "mongoose";

const handleIdValidation = async (
  req: BattleRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const { battleId } = req.params;

  const isBattleIdValid = mongoose.isObjectIdOrHexString(battleId);

  if (!isBattleIdValid) {
    const error = new ServerError(
      statusCodes.BAD_REQUEST,
      "The battle identifier is not correct",
    );

    next(error);
    return;
  }

  next();
};

export default handleIdValidation;
