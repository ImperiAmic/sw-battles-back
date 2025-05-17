export interface BattleStructure {
  _id: string;
  battleName: string;
  conflict: string;
  year: number;
  period: "BBY" | "ABY";
  imageUrl?: string;
  description: string;
  lightSide: string[];
  darkSide: string[];
  doesLightSideWin: boolean;
}

export type BattleData = Omit<BattleStructure, "_id">;

export interface GetBattlesResponseBody {
  battles: BattleData[];
  battlesTotal: number;
}

export interface BattleResponseBody {
  battle: BattleData;
}

export interface ResponseBodyError {
  error: string;
}
