import { Response } from "express";
import { Model } from "mongoose";
import { BattleStructure } from "../types.js";
import { BattleControllerStructure, BattleRequest } from "./types.js";
import statusCodes from "../../globals/statusCodes.js";

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
      .sort({ year: "desc" })
      .exec();

    const abyPeriodBattles = await this.battleModel
      .find<BattleStructure>({ period: "ABY" })
      .sort({ year: "asc" })
      .exec();

    const allBattles = [...bbyPeriodBattles, ...abyPeriodBattles];
    const battles = allBattles.slice(startPosition, endPosition);

    const battlesTotal = await this.battleModel.countDocuments();

    res.status(statusCodes.OK).json({ battles, battlesTotal });
  };
}

export default BattleController;
