import { NextFunction, Response } from "express";
import { BattleRequest } from "../../../battle/controller/types.js";
import handleIdValidation from "./handleIdValidation.js";
import ServerError from "../../ServerError/ServerError.js";
import statusCodes from "../../../globals/statusCodes.js";
import { rosesBattle } from "../../../battle/fixtures.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the handleIdValidation middleware", () => {
  const res = {};
  const next = jest.fn();

  describe("When it receives a request with and invalid Battle ID", () => {
    test("Then it should next a 'The battle identifier is not correct' error", () => {
      const error = new ServerError(
        statusCodes.BAD_REQUEST,
        "The battle identifier is not correct",
      );

      const req: Pick<BattleRequest, "params"> = {
        params: {
          battleId: "CaTaLuNyAiSnoTsPaIn",
        },
      };

      handleIdValidation(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenLastCalledWith(error);
    });
  });

  describe("When it receives a request with Siege of Roses battle ID", () => {
    test("Then it should next it", () => {
      const req: Pick<BattleRequest, "params"> = {
        params: {
          battleId: rosesBattle._id,
        },
      };

      handleIdValidation(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalled();
    });
  });
});
