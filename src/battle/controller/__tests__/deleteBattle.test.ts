import { Model } from "mongoose";
import { NextFunction, Response } from "express";
import { BattleStructure } from "../../types.js";
import { martorellBattle } from "../../fixtures.js";
import BattleController from "../BattleController.js";
import statusCodes from "../../../globals/statusCodes.js";
import { BattleRequest, BattleResponse } from "../types.js";
import ServerError from "../../../server/ServerError/ServerError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the deleteBattle controller's method", () => {
  const res: Pick<BattleResponse, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with the Battle of Martorell ID", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: { battleId: martorellBattle._id },
    };

    const battleModel: Pick<Model<BattleStructure>, "findByIdAndDelete"> = {
      findByIdAndDelete: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(martorellBattle),
      }),
    };

    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatusCode = 200;

      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.deleteBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's method json with Battle of Martorell", async () => {
      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.deleteBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ battle: martorellBattle });
    });
  });

  describe("When it receives a request with a battle ID that does not exists", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: {
        battleId: "aaaaaaaaaaaaaaaaaaaaaaaa",
      },
    };

    const battleModel: Pick<Model<BattleStructure>, "findByIdAndDelete"> = {
      findByIdAndDelete: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should next 'The battle identifier has not been found' error", async () => {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "The battle identifier has not been found",
      );

      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.deleteBattle(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
