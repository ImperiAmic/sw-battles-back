import { Model } from "mongoose";
import { BattleStructure } from "../../types.js";
import {
  editedDuplicatedRuscinoBattle,
  editedRuscinoBattle,
  ruscinoBattle,
} from "../../fixtures.js";
import BattleController from "../BattleController.js";
import { BattleRequest, BattleResponse } from "../types.js";
import { NextFunction } from "express";
import ServerError from "../../../server/ServerError/ServerError.js";
import statusCodes from "../../../globals/statusCodes.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the editBattle method from BattleController", () => {
  const res: Pick<BattleResponse, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with edited Battle of Ruscino", () => {
    const req: Pick<BattleRequest, "params" | "body"> = {
      params: {
        battleId: ruscinoBattle._id,
      },
      body: {
        battle: editedRuscinoBattle,
      },
    };

    const battleModel: Pick<
      Model<BattleStructure>,
      "findById" | "findOne" | "findOneAndReplace"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(ruscinoBattle),
      }),
      findOne: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(null) }),
      findOneAndReplace: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(editedRuscinoBattle),
      }),
    };

    test("Then it should call the received response's method status with 200", async () => {
      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.editBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the received response's method json with edited Battle of Ruscino", async () => {
      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.editBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ battle: editedRuscinoBattle });
    });
  });

  describe("When it receives a request with a non existing ID", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: {
        battleId: "abcdefabcdefabcdefabcdef",
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

      await battleController.editBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request with an ID which is not correct", () => {
    const req: Pick<BattleRequest, "params"> = {
      params: {
        battleId: "abuelalapastilla",
      },
    };

    const battleModel: Pick<Model<BattleStructure>, "findById"> = {
      findById: jest.fn().mockReturnValue({
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

      await battleController.editBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request with edited Battle of Ruscino but same battle name as other already in DB", () => {
    const req: Pick<BattleRequest, "params" | "body"> = {
      params: {
        battleId: editedDuplicatedRuscinoBattle._id,
      },
      body: {
        battle: editedDuplicatedRuscinoBattle,
      },
    };

    const battleModel: Pick<
      Model<BattleStructure>,
      "findById" | "findOne" | "findOneAndReplace"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(editedDuplicatedRuscinoBattle),
      }),
      findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue({
          _id: "222bbb222bbb222bbb222fff",
          battleName: editedDuplicatedRuscinoBattle.battleName,
        }),
      }),
      findOneAndReplace: jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue(null),
      }),
    };

    test("Then it should next 'The battle edited has same name as other already in database' error", async () => {
      const error = new ServerError(
        statusCodes.CONFLICT,
        "The battle edited has same name as other already in database",
      );

      const battleController = new BattleController(
        battleModel as Model<BattleStructure>,
      );

      await battleController.editBattle(
        req as BattleRequest,
        res as BattleResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
