import express from "express";
import { Budget } from "../models/Budget";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(403).send();
});

router.get("/getBudget", async (_, res) => {
  const budgets = await Budget.find();
  res.status(200).send(budgets);
});

router.post("/add", async (req, res) => {
  if (!req.body.orlogo) {
    return res
      .status(200)
      .send({ result: "Орлогоо оруулна уу.", success: false });
  }
  if (!req.body.zarlaga) {
    return res
      .status(200)
      .send({ result: "Зарлагаа оруулна уу.", success: false });
  }

  const budget = new Budget({
    orlogo: req.body.orlogo,
    zarlaga: req.body.zarlaga,
  });

  await budget.save();

  return res.status(200).send({
    result: budget,
    message: "Амжилттай бүртгэгдлээ.",
  });
});

router.post("/delete", async (req, res) => {
  const budgetId = req.body.userId;
  if (!budgetId) {
    return res
      .status(200)
      .send({ result: "budgetId-г оруулна уу.", success: false });
  }
  await Budget.findByIdAndDelete({ _id: budgetId });
  res.status(200).send({
    result: budgetId,
    success: true,
  });
});

module.exports = router;
