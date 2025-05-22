import { Model } from "mongoose";
import { NextFunction } from "express";
import { BattleData, BattleStructure } from "../types.js";
import statusCodes from "../../globals/statusCodes.js";
import ServerError from "../../server/ServerError/ServerError.js";
import {
  BattleControllerStructure,
  BattleRequest,
  GetBattleResponse,
  BattleResponse,
} from "./types.js";

class BattleController implements BattleControllerStructure {
  constructor(private readonly battleModel: Model<BattleStructure>) {}

  public getBattles = async (
    req: BattleRequest,
    res: GetBattleResponse,
  ): Promise<void> => {
    let { page } = req.query;

    if (!page) {
      page = "1";
    }

    const battlesPerPageNumber = 6;
    const startPosition = (Number(page) - 1) * battlesPerPageNumber;
    const endPosition = startPosition + battlesPerPageNumber;

    const bbyPeriodBattles = await this.battleModel
      .find<BattleStructure>({ period: "BBY" })
      .sort({ year: "desc", battleName: "asc" })
      .exec();

    const abyPeriodBattles = await this.battleModel
      .find<BattleStructure>({ period: "ABY" })
      .sort({ year: "asc", battleName: "asc" })
      .exec();

    const allBattles = [...bbyPeriodBattles, ...abyPeriodBattles];
    const battles = allBattles.slice(startPosition, endPosition);

    const battlesTotal = await this.battleModel.countDocuments();

    res.status(statusCodes.OK).json({ battles, battlesTotal });
  };

  public toggleBattleWinner = async (
    req: BattleRequest,
    res: BattleResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { battleId } = req.params;

    const battle = await this.battleModel.findById(battleId).exec();

    if (!battle) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "The battle identifier has not been found",
      );

      next(error);
      return;
    }

    const toggledBattle = await this.battleModel
      .findByIdAndUpdate(
        battleId,
        {
          doesLightSideWin: !battle.doesLightSideWin,
        },
        { new: true },
      )
      .exec();

    res.status(statusCodes.OK).json({ battle: toggledBattle! });
  };

  public deleteBattle = async (
    req: BattleRequest,
    res: BattleResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { battleId } = req.params;

    const deletedBattle = await this.battleModel
      .findByIdAndDelete(battleId)
      .exec();

    if (!deletedBattle) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "The battle identifier has not been found",
      );

      next(error);
      return;
    }

    res.status(statusCodes.OK).json({ battle: deletedBattle });
  };

  public getBattle = async (
    req: BattleRequest,
    res: BattleResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { battleId } = req.params;

    const battle = await this.battleModel.findById(battleId).exec();

    if (!battle) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "The battle identifier has not been found",
      );

      next(error);
      return;
    }

    res.status(statusCodes.OK).json({ battle: battle });
  };

  public addBattle = async (
    req: BattleRequest,
    res: BattleResponse,
    next: NextFunction,
  ): Promise<void> => {
    const battle = req.body as BattleData;

    const existingBattle = await this.battleModel.findOne({
      battleName: battle.battleName,
    });

    if (existingBattle) {
      const error = new ServerError(
        statusCodes.CONFLICT,
        "The battle to add is already in the database",
      );

      next(error);
      return;
    }

    const newBattle = await this.battleModel.create(battle);
    await newBattle.save();

    res.status(statusCodes.CREATED).json({ battle: newBattle });
  };
}

export default BattleController;
