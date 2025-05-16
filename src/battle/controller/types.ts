import { NextFunction, Request, Response } from "express";
import { BattleStructure } from "../types.js";

export type BattleParams = {
  battleId: string;
};

export type BattleQuery = {
  page: string;
};

export type BattleRequest = Request<
  BattleParams,
  Record<string, unknown>,
  Record<string, unknown>,
  BattleQuery
>;

type GetBattleResponseBody = {
  battles: BattleStructure[];
  battlesTotal: number;
};

export type GetBattleResponse = Response<GetBattleResponseBody>;

type ToggleBattleWinnerResponseBody = {
  battle: BattleStructure;
};

export type ToggleBattleWinnerResponse =
  Response<ToggleBattleWinnerResponseBody>;

export interface BattleControllerStructure {
  getBattles: (req: BattleRequest, res: GetBattleResponse) => Promise<void>;
  toggleBattleWinner: (
    req: BattleRequest,
    res: ToggleBattleWinnerResponse,
    next: NextFunction,
  ) => Promise<void>;
}
