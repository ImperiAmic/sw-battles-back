import { Router } from "express";
import Battle from "../model/Battle.js";
import BattleController from "../controller/BattleController.js";
import handleIdValidation from "../../server/middlewares/handleIdValidation/handleIdValidation.js";

const battlesRouter = Router();

const battleController = new BattleController(Battle);

battlesRouter.get("/", battleController.getBattles);
battlesRouter.patch(
  "/:battleId",
  handleIdValidation,
  battleController.toggleBattleWinner,
);
battlesRouter.delete(
  "/:battleId",
  handleIdValidation,
  battleController.deleteBattle,
);
battlesRouter.get("/:battleId", handleIdValidation, battleController.getBattle);

export default battlesRouter;
