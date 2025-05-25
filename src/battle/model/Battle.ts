import mongoose, { Schema } from "mongoose";
import { BattleStructure } from "../types.js";

const battleSchema = new Schema<BattleStructure>({
  battleName: {
    type: String,
    required: true,
  },
  conflict: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    enum: ["BBY", "ABY"],
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  lightSide: {
    type: [String],
    required: true,
  },
  darkSide: {
    type: [String],
    required: true,
  },
  doesLightSideWin: {
    type: Boolean,
    required: true,
  },
});

const Battle = mongoose.model("Battle", battleSchema, "battles");

export default Battle;
