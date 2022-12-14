import { Orlogo } from "../models/Orlogo";
import express from "express";

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

router.post("/deleteOrlogo", async (req, res) => {
  const { orlogoId } = req.body;
  if (!orlogoId) {
    return res
      .status(200)
      .send({ result: "Орлогын ID-г оруулна уу.", success: false });
  }
  await Orlogo.findByIdAndDelete({ _id: orlogoId });
  res.status(200).send({
    result: orlogoId,
    success: true,
  });
});

module.exports = router;
