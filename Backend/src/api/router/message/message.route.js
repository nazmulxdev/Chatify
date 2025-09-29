import { Router } from "express";
import {
  getAllChats,
  getAllContacts,
  getMessageById,
  sendMessage,
} from "../../controller/message/message.controller.js";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import arcjetProtection from "../../middlewares/arcjet.middleware.js";

const router = Router();
router.use(arcjetProtection, verifyToken);
router.get("/contacts", getAllContacts);
router.get("/chats", getAllChats);
router.get("/:id/messages", getMessageById);
router.post("/send/:id", sendMessage);

export default router;
