import { Router } from "express";
import Battle from "../model/Battle.js";
import BattleController from "../controller/BattleController.js";

const battlesRouter = Router();

const battleController = new BattleController(Battle);

battlesRouter.get("/", battleController.getBattles);
battlesRouter.patch("/:battleId", battleController.updateBattleWinner);

export default battlesRouter;
