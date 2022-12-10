import express from "express";
import { Orlogo } from "@/models/Orlogo";
import { Zarlaga } from "@/models/Zarlaga";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(403).send();
});

router.get("/getOrlogo", async (_, res) => {
  const budgets = await Orlogo.find();
  const formatted = budgets.map((d) => ({
    _id: d._id,
    orlogo: d.orlogo,
  }));
  res.status(200).send({ result: formatted, success: true });
});

router.get("/getZarlaga", async (_, res) => {
  const budgets = await Zarlaga.find();
  const formatted = budgets.map((d) => ({
    _id: d._id,
    zarlaga: d.zarlaga,
  }));
  res.status(200).send({ result: formatted, success: true });
});

router.post("/addOrlogo", async (req, res) => {
  if (!req.body.orlogo) {
    return res
      .status(200)
      .send({ result: "Орлогоо оруулна уу.", success: false });
  }

  const orlogo = new Orlogo({
    orlogo: req.body.orlogo,
  });

  await orlogo.save();

  return res.status(200).send({
    result: orlogo,
    message: "Амжилттай бүртгэгдлээ.",
  });
});

router.post("/addZarlaga", async (req, res) => {
  if (!req.body.zarlaga) {
    return res
      .status(200)
      .send({ result: "Зарлагаа оруулна уу.", success: false });
  }

  const budget = new Zarlaga({
    zarlaga: req.body.zarlaga,
  });

  await budget.save();

  return res.status(200).send({
    result: budget,
    message: "Амжилттай бүртгэгдлээ.",
  });
});

router.post("/deleteOrlogo", async (req, res) => {
  const orlogoId = req.body.orlogoId;
  if (!orlogoId) {
    return res
      .status(200)
      .send({ result: "orlogoId-г оруулна уу.", success: false });
  }
  await Orlogo.findByIdAndDelete({ _id: orlogoId });
  res.status(200).send({
    result: orlogoId,
    success: true,
  });
});

router.post("/deleteZarlaga", async (req, res) => {
  const zarlagaId = req.body.zarlagaId;
  if (!zarlagaId) {
    return res
      .status(200)
      .send({ result: "zarlagaId-г оруулна уу.", success: false });
  }
  await Zarlaga.findByIdAndDelete({ _id: zarlagaId });
  res.status(200).send({
    result: zarlagaId,
    success: true,
  });
});

module.exports = router;
