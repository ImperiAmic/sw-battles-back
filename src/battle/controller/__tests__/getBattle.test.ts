import { Model } from "mongoose";
import { NextFunction, Response } from "express";
import { BattleStructure } from "../../types.js";
import { montjuicBattle } from "../../fixtures.js";
import BattleController from "../BattleController.js";
import statusCodes from "../../../globals/statusCodes.js";
import { BattleRequest, BattleResponse } from "../types.js";
import ServerError from "../../../server/ServerError/ServerError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the getBattle controller's method", () => {
  const res: Pick<BattleResponse, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with the ID of the Battle of Montjuïc", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: { battleId: montjuicBattle._id },
    };

    const battleModel: Pick<Model<BattleStructure>, "findById"> = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(montjuicBattle),
      }),
    };

    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatusCode = 200;

      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.getBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's method json with Battle of Montjuïc", async () => {
      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.getBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ battle: montjuicBattle });
    });
  });

  describe("When it receives a request with a battle ID that does not exists", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: {
        battleId: "aaaaaaaaaaaaaaaaaaaaaaaa",
      },
    };

    const battleModel: Pick<Model<BattleStructure>, "findById"> = {
      findById: jest.fn().mockReturnValue({
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

      await battleController.getBattle(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
