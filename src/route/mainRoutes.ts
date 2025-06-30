import express from "express";
const router = express.Router();
import mainController from "../controllers/mainControllers";

router.get("/", mainController.getIndex);
router.post("/time", mainController.postTime);

export default router;