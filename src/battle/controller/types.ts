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

type BattleResponseBody = {
  battle: BattleStructure;
};

export type BattleResponse = Response<BattleResponseBody>;

export interface BattleControllerStructure {
  getBattles: (req: BattleRequest, res: GetBattleResponse) => Promise<void>;
  toggleBattleWinner: (
    req: BattleRequest,
    res: BattleResponse,
    next: NextFunction,
  ) => Promise<void>;
  deleteBattle: (
    req: BattleRequest,
    res: BattleResponse,
    next: NextFunction,
  ) => Promise<void>;
  getBattle: (
    req: BattleRequest,
    res: BattleResponse,
    next: NextFunction,
  ) => Promise<void>;
  addBattle: (
    req: BattleRequest,
    res: BattleResponse,
    next: NextFunction,
  ) => Promise<void>;
}
