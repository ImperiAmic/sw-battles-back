import { Model } from "mongoose";
import { Response } from "express";
import { BattleRequest } from "../types.js";
import { BattleStructure } from "../../types.js";
import { catalanBattles } from "../../fixtures.js";
import BattleController from "../BattleController.js";
import statusCodes from "../../../globals/statusCodes.js";

let battles = [...catalanBattles];
const battlesTotal = catalanBattles.length;
let allBattles: BattleStructure[] = [];

beforeEach(() => {
  jest.clearAllMocks();
  battles = [...catalanBattles];

  const bbyBattles = battles
    .filter((battle) => battle.period === "BBY")
    .sort((currentYear, nextYear) => nextYear.year - currentYear.year)
    .sort((currentName, nextName) =>
      currentName.name.localeCompare(nextName.name),
    );

  const abyBattles = battles
    .filter((battle) => battle.period === "ABY")
    .sort((currentYear, nextYear) => currentYear.year - nextYear.year)
    .sort((currentName, nextName) =>
      currentName.name.localeCompare(nextName.name),
    );

  allBattles = [...bbyBattles, ...abyBattles];
});

describe("Given the getBattle method of BattleController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const filterBattlesByPeriod = (query: { period: "BBY" | "ABY" }) => {
    const sortedByPeriodBattles =
      query.period === "BBY"
        ? battles.filter((battle) => battle.period === "BBY")
        : battles.filter((battle) => battle.period === "ABY");

    const filterBattlesByYear = (query: { year: "desc" | "asc" }) => {
      const sortedByPeriodAndYearBattles =
        query.year === "desc"
          ? sortedByPeriodBattles
              .sort((currentYear, nextYear) => nextYear.year - currentYear.year)
              .sort((currentName, nextName) =>
                currentName.name.localeCompare(nextName.name),
              )
          : sortedByPeriodBattles
              .sort((currentYear, nextYear) => currentYear.year - nextYear.year)
              .sort((currentName, nextName) =>
                currentName.name.localeCompare(nextName.name),
              );

      return {
        exec: jest.fn().mockResolvedValue(sortedByPeriodAndYearBattles),
      };
    };

    return {
      sort: jest.fn().mockImplementation(filterBattlesByYear),
    };
  };

  const battleModel: Pick<Model<BattleStructure>, "find" | "countDocuments"> = {
    find: jest.fn().mockImplementation(filterBattlesByPeriod),
    countDocuments: jest.fn().mockResolvedValue(battlesTotal),
  };

  describe("When it receives a request and a response", () => {
    const req: Pick<BattleRequest, "query"> = {
      query: {
        page: "",
      },
    };

    const battleController = new BattleController(
      battleModel as Model<BattleStructure>,
    );

    test("Then it should call the response's status method with a 200 code status", async () => {
      const expectedStatusCode = statusCodes.OK;

      await battleController.getBattles(req as BattleRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with Empuries, Ruscino, Ilipa, Martorell, Monjuïc and Lleida battles", async () => {
      const expectedBattles = allBattles.slice(0, 6);

      await battleController.getBattles(req as BattleRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ battles: expectedBattles }),
      );
    });
  });

  describe("When it receives a request with page 2 and a response", () => {
    const req: Pick<BattleRequest, "query"> = {
      query: {
        page: "2",
      },
    };

    const battleController = new BattleController(
      battleModel as Model<BattleStructure>,
    );

    test("Then it should call the response's json method with Barcelona, Siege of Roses and Ebro battles", async () => {
      const expectedBattles = allBattles.slice(6, 12);

      await battleController.getBattles(req as BattleRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ battles: expectedBattles }),
      );
    });
  });
});
