import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  allUsers,
} from "../controllers/userController.js";

const router = Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password/:token", resetPassword);

router.get("/", allUsers);

router.get("/validate_token", verifyToken, (req, res) => {
  res.status(200).json({ userId: req.userId, role: req.role });
});

router.post("/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logged Out Successfully" });
});

export default router;
