import { Router } from "express";
import {
  login,
  logout,
  signUp,
  updateProfile,
} from "../../controller/auth/auth.controller.js";
import { verifyToken } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", verifyToken, updateProfile);
router.get("/check", verifyToken, (req, res) => res.status(200).json(req.user));

export default router;
