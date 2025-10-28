import { Router } from "express";
import { createExpense, deleteExpense, getAllExpense, updateExpense } from "../controllers/expenseController.js";
import verifyToken from "../middleware/verifyToken.js";

const router =Router();

router.post("/createExpense",verifyToken,createExpense);

router.get("/",verifyToken,getAllExpense);

router.delete("/:id",verifyToken,deleteExpense);

router.put("/:id",verifyToken,updateExpense);

export default router;