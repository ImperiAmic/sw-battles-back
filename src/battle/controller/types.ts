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

type UpdateBattleWinnerResponseBody = {
  battle: BattleStructure;
};

export type UpdateBattleWinnerResponse =
  Response<UpdateBattleWinnerResponseBody>;

export interface BattleControllerStructure {
  getBattles: (req: BattleRequest, res: GetBattleResponse) => Promise<void>;
  updateBattleWinner: (
    req: BattleRequest,
    res: UpdateBattleWinnerResponse,
    next: NextFunction,
  ) => Promise<void>;
}
