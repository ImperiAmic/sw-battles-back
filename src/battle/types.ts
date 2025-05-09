export interface BattleStructure {
  _id: string;
  name: string;
  conflict: string;
  year: number;
  period: "BBY" | "ABY";
  imageUrl?: string;
  description: string;
  lightSide: [string];
  darkSide: [string];
  winner: boolean;
}
