import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (_, res) => {
  res.status(403).send();
});

router.post("/login", async (req, res) => {
  const message = "Имэйл эсвэл нууц үг буруу байна.";

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(200).send({ success: false, result: message });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).send({ success: false, result: message });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(200).send({ success: false, result: message });
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    return res.status(200).send({ success: false, result: "Алдаа гарлаа" });
  }

  const accessToken = await jwt.sign(
    { email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  res.status(200).send({
    result: accessToken,
    success: true,
  });
});

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(req.body);
  if (!email) {
    return res
      .status(200)
      .send({ result: "Нэвтрэх нэрээ оруулна уу.", success: false });
  }
  if (!password) {
    return res
      .status(200)
      .send({ result: "Нууц үгээ оруулна уу.", success: false });
  }
  if (!firstName) {
    return res
      .status(200)
      .send({ result: "Нэрээ оруулна уу.", success: false });
  }
  if (!lastName) {
    return res
      .status(200)
      .send({ result: "Овгоо оруулна уу.", success: false });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res
      .status(200)
      .send({ result: "Бүртгэлтэй хэрэглэгч байна.", success: false });
  }

  const user = new User({
    email,
    password,
    firstName,
    lastName,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  if (!process.env.ACCESS_TOKEN_SECRET) {
    return res.status(200).send({ success: false, result: "Алдаа гарлаа" });
  }

  const accessToken = await jwt.sign(
    { email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  await user.save();
  res.status(200).send({
    result: accessToken,
    success: true,
  });
});

module.exports = router;
