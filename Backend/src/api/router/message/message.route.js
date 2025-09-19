import { Router } from "express";
import { message } from "../../controller/message/message.controller.js";

const router = Router();
router.get("/message", message);

export default router;
