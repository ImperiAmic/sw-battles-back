import { Model } from "mongoose";
import { NextFunction, Response } from "express";
import { BattleStructure } from "../../types.js";
import { empuriesBattle } from "../../fixtures.js";
import BattleController from "../BattleController.js";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../../server/ServerError/ServerError.js";
import { BattleRequest, BattleResponse } from "../types.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the toggleBattleWinner method of BattleController", () => {
  const res: Pick<BattleResponse, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with Battle of Empúries", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: {
        battleId: empuriesBattle._id,
      },
    };

    const expectedToggledBattle = { ...empuriesBattle };
    expectedToggledBattle.doesLightSideWin = false;

    const battleModel: Pick<
      Model<BattleStructure>,
      "findById" | "findByIdAndUpdate"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(empuriesBattle),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(expectedToggledBattle),
      }),
    };

    test("Then it should call the received response's method status with 200", async () => {
      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.toggleBattleWinner(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the received response's method json with modified Battle of Empúries", async () => {
      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.toggleBattleWinner(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({
        battle: expectedToggledBattle,
      });
    });
  });

  describe("When it receives a request with a non existing ID", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: {
        battleId: "aaaaaaaaaaaaaaaaaaaaaaaa",
      },
    };

    const battleModel: Pick<
      Model<BattleStructure>,
      "findById" | "findByIdAndUpdate"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
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

      await battleController.toggleBattleWinner(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request with an ID which is not correct", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: {
        battleId: "111aaa111aaa111aaa111aa",
      },
    };

    const battleModel: Pick<
      Model<BattleStructure>,
      "findById" | "findByIdAndUpdate"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should next 'The battle identifier has not been found' error", async () => {
      const error = new ServerError(
        statusCodes.BAD_REQUEST,
        "The battle identifier has not been found",
      );

      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.toggleBattleWinner(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
