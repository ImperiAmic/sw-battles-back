import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import { BattleStructure } from "../types.js";
import { BattleControllerStructure, BattleRequest } from "./types.js";
import statusCodes from "../../globals/statusCodes.js";
import ServerError from "../../server/ServerError/ServerError.js";

class BattleController implements BattleControllerStructure {
  constructor(private readonly battleModel: Model<BattleStructure>) {}

  public getBattles = async (
    req: BattleRequest,
    res: Response,
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
      .sort({ year: "desc", name: "asc" })
      .exec();

    const abyPeriodBattles = await this.battleModel
      .find<BattleStructure>({ period: "ABY" })
      .sort({ year: "asc", name: "asc" })
      .exec();

    const allBattles = [...bbyPeriodBattles, ...abyPeriodBattles];
    const battles = allBattles.slice(startPosition, endPosition);

    const battlesTotal = await this.battleModel.countDocuments();

    res.status(statusCodes.OK).json({ battles, battlesTotal });
  };

  public updateBattleWinner = async (
    req: BattleRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { battleId } = req.params;

    const battleIdRequiredLength = 24;

    if (battleId.length !== battleIdRequiredLength) {
      const error = new ServerError(
        statusCodes.NOT_ACCEPTABLE,
        "The battle identifier to update the winner of the battle is not correct",
      );

      next(error);
      return;
    }

    const battle = await this.battleModel.findById(battleId).exec();

    if (!battle) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "The battle identifier has not been found",
      );

      next(error);
      return;
    }

    const updatedBattle = await this.battleModel
      .findByIdAndUpdate(
        battleId,
        {
          doesLightSideWin: !battle.doesLightSideWin,
        },
        { new: true },
      )
      .exec();

    if (!updatedBattle) {
      const error = new ServerError(
        statusCodes.BAD_REQUEST,
        "Could not be able to update the winner of the battle",
      );

      next(error);
      return;
    }

    res.status(200).json({ battle: updatedBattle });
  };
}

export default BattleController;
