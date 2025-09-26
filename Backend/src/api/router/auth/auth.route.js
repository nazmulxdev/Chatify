import { Router } from "express";
import {
  login,
  logout,
  signUp,
} from "../../controller/auth/auth.controller.js";

const router = Router();

router.post("/signup", signUp);
router.get("/login", login);
router.get("/logout", logout);

export default router;
