import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import User from "./models/user.js";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/sign-up", cors(), async (req, res) => {
  try {
    let user = await User.findOne({
      username: req.body.username,
    });

    if (user) {
      return res.status(400).json({
        message: "This username is already taken. Please choose another one.",
      });
    }

    user = new User(req.body);
    await user.save();

    return res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

app.post("/sign-in", cors(), async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Sign in failed due to invalid credentials" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res
        .status(400)
        .json({ message: "Sign in failed due to invalid credentials" });
    }

    return res.status(200).json({ message: "Sign in successful" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(5000);
