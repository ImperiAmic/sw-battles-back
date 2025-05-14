import { NextFunction, Request, Response } from "express";

interface BattleParams {
  battleId: string;
}

interface BattleQuery {
  page: string;
}

export type BattleRequest = Request<
  BattleParams,
  Record<string, never>,
  Record<string, never>,
  BattleQuery
>;

export interface BattleControllerStructure {
  getBattles: (req: BattleRequest, res: Response) => Promise<void>;
  updateBattleWinner: (
    req: BattleRequest,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}
