import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  allUsers,
  logout,
  verifyTok
} from "../controllers/userController.js";

const router = Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password/:token", resetPassword)
  .post("/logout",logout);
router.get("/", allUsers);

router.get("/validate_token", verifyToken,verifyTok);

export default router;
