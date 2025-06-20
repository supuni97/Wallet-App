import express from "express";
import {
  getTransactionsByUserId,
  createTransaction,
  deleteTransaction,
  getSummaryByUserId,
} from "../src/controllers/transactionsController.js";

const router = express.Router();
//const { getTransactionsByUserId } = transactionsController;

//api end point - get total
router.get("/summary/:userId", getSummaryByUserId);

//api end point - retrieve all transactions by user_id
router.get("/:userId", getTransactionsByUserId);

//api end point - add a new transaction
router.post("/", createTransaction);

//console.log(process.env.PORT);

//api end point - delete a transaction by id
router.delete("/:id", deleteTransaction);

export default router;
