import { Request, Response } from "express";

interface BattleQuery {
  page: string;
}

export type BattleRequest = Request<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  BattleQuery
>;

export interface BattleControllerStructure {
  getBattles: (req: BattleRequest, res: Response) => Promise<void>;
}
