import { NextFunction } from "express";
import { Model } from "mongoose";
import { BattleRequest, BattleResponse } from "../types.js";
import {
  newRosesBattle,
  newVilafrancaBattle,
  rosesBattle,
} from "../../fixtures.js";
import BattleController from "../BattleController.js";
import { BattleStructure } from "../../types.js";
import ServerError from "../../../server/ServerError/ServerError.js";
import statusCodes from "../../../globals/statusCodes.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the addBattle method from BattleController", () => {
  const res: Pick<BattleResponse, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with the new Battle of Vilafranca", () => {
    const battleModel: Pick<Model<BattleStructure>, "findOne" | "create"> = {
      findOne: jest.fn().mockReturnValue(null),
      create: jest.fn().mockReturnValue({
        ...newVilafrancaBattle,
        save: jest.fn(),
      }),
    };

    const req: Pick<BattleRequest, "body"> = {
      body: newVilafrancaBattle,
    };

    test("Then it should call the received response's method status with 200", async () => {
      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.addBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Then it should call the received response's method json with Vilafranca battle", async () => {
      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.addBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          battle: expect.objectContaining({
            battleName: newVilafrancaBattle.battleName,
          }),
        }),
      );
    });
  });

  describe("When it receives a request with the already added Roses battle", () => {
    test("Then it should next 'The battle to add is already in the database' error", async () => {
      const battleModel: Pick<Model<BattleStructure>, "findOne"> = {
        findOne: jest.fn().mockReturnValue(rosesBattle),
      };

      const req: Pick<BattleRequest, "body"> = {
        body: newRosesBattle,
      };

      const error = new ServerError(
        statusCodes.CONFLICT,
        "The battle to add is already in the database",
      );

      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.addBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
