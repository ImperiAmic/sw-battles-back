import { Model } from "mongoose";
import { NextFunction, Response } from "express";
import { BattleRequest } from "../types.js";
import { BattleStructure } from "../../types.js";
import { battleOfEmpuries } from "../../fixtures.js";
import BattleController from "../BattleController.js";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../../server/ServerError/ServerError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the updateBattleWinner method of BattleController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with Battle of Empúries", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: {
        battleId: battleOfEmpuries._id,
      },
    };

    const expectedUpdatedBattle = { ...battleOfEmpuries };
    expectedUpdatedBattle.doesLightSideWin = false;

    const battleModel: Pick<
      Model<BattleStructure>,
      "findById" | "findByIdAndUpdate"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(battleOfEmpuries),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(expectedUpdatedBattle),
      }),
    };

    test("Then it should call the received response's method status with 200", async () => {
      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.updateBattleWinner(
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

      await battleController.updateBattleWinner(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({
        battle: expectedUpdatedBattle,
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

      await battleController.updateBattleWinner(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request with an existing ID but could not be able to update it", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: {
        battleId: "111aaa111aaa111aaa111aaa",
      },
    };

    const battleModel: Pick<
      Model<BattleStructure>,
      "findById" | "findByIdAndUpdate"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(battleOfEmpuries),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should next 'Could not be able to update the winner of the battle", async () => {
      const error = new ServerError(
        statusCodes.BAD_REQUEST,
        "Could not be able to update the winner of the battle",
      );

      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.updateBattleWinner(
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

    test("Then it should next 'The battle identifier to update the winner of the battle is not correct", async () => {
      const error = new ServerError(
        statusCodes.NOT_ACCEPTABLE,
        "The battle identifier to update the winner of the battle is not correct",
      );

      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.updateBattleWinner(
        req as BattleRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
